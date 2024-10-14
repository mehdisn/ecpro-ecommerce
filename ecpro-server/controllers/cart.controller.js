const _ = require('lodash');
const db = require('../models');
const Cart = db.Cart;
const CartItem = db.CartItems;
const Product = db.Product;
const sequelize = db.sequelize;

exports.addToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: {
                userId: req.userId
            }
        });
        if (!cart) {
            cart = await Cart.create({
                total: 0,
                itemsCount: 0,
                userId: req.userId
            })
        }
        const product = await Product.findOne({
            where: {
                id: req.body.productId
            }
        })
        const cartProduct = await CartItem.findOne({
            where: {
                productId: req.body.productId,
                cartId: cart.id
            }
        })

        let qty = cartProduct ? cartProduct.qty : 0;

        if (product.dataValues.stock < 1 || qty >= product.dataValues.stock) {
            return res.status(403).json({ message: "Product does not have stock" });
        }
        if (cartProduct) {
            await CartItem.update(
                {
                    qty: cartProduct.qty + 1
                },
                {
                    where: {
                        productId: cartProduct.productId,
                        cartId: cart.id
                    }
                }
            );
        } else {
            const productVersion = await product.getVersions();
            console.log(productVersion[0].dataValues.version_id)
            await CartItem.create({
                cartId: cart.id,
                productId: req.body.productId,
                name: product.name,
                defaultPictureUrl: product.defaultPictureUrl,
                price: product.price,
                version_id: productVersion[0].dataValues.version_id,
                version_type: productVersion[0].dataValues.version_type
            });
        }
        const itemsCount = await CartItem.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('qty')), 'result']
            ],
            where: {
                cartId: cart.id
            }
        });
        const total = await CartItem.findAll({
            attributes: [[sequelize.literal('SUM(price * qty)'), 'result']],
            where: {
                cartId: cart.id
            }
        })
        cart.itemsCount = itemsCount[0].dataValues.result ? itemsCount[0].dataValues.result : "0"
        cart.save();
        cart.total = total[0].dataValues.result ? total[0].dataValues.result : "0"
        cart.save();
        cartItem = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({ "cart": cart, "Items": cartItem });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

exports.getCart = async (req, res) => {
    try {
        let cartItem;
        let priceChangedProduct = [];
        let stockChangedProduct = [];
        const cart = await Cart.scope("withoutDate").findOne({
            where: {
                userId: req.userId
            }
        });
        cartItem = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        //Check if cart item stock or price changed
        for (let i = 0; i < cartItem.length; i++) {
            let product = await Product.findOne({ where: { id: cartItem[i].dataValues.productId } });
            let productVersion = await product.getVersions();
            if (productVersion[productVersion.length - 1].dataValues.version_type != cartItem[i].dataValues.version_type || productVersion[productVersion.length - 1].dataValues.version_id != cartItem[i].dataValues.version_id) {
                if (productVersion[productVersion.length - 1].dataValues.price != cartItem[i].dataValues.price) {
                    priceChangedProduct.push(productVersion[productVersion.length - 1].dataValues);
                }
                if (productVersion[productVersion.length - 1].dataValues.stock < cartItem[i].dataValues.qty) {
                    stockChangedProduct.push(productVersion[productVersion.length - 1].dataValues);
                }
            }
        }
        if (stockChangedProduct.length > 0) {
            stockChangedProduct.map(async product => {
                await CartItem.destroy({
                    where: {
                        cartId: cart.id,
                        productId: product.id
                    }
                })
            })
        }
        if (priceChangedProduct.length > 0) {
            priceChangedProduct.map(async product => {
                console.log(product)
                await CartItem.update({
                    price: product.price
                }, {
                    where: {
                        cartId: cart.id,
                        productId: product.id
                    }
                })
            });
        }


        //If changed update cart
        if (priceChangedProduct.length > 0 || stockChangedProduct.length > 0) {
            const itemsCount = await CartItem.findAll({
                attributes: [
                    [sequelize.fn('sum', sequelize.col('qty')), 'result']
                ],
                where: {
                    cartId: cart.id
                }
            });
            const total = await CartItem.findAll({
                attributes: [[sequelize.literal('SUM(price * qty)'), 'result']],
                where: {
                    cartId: cart.id
                }
            })
            cart.itemsCount = itemsCount[0].dataValues.result ? itemsCount[0].dataValues.result : "0"
            cart.save();
            cart.total = total[0].dataValues.result ? total[0].dataValues.result : "0"
            cart.save();
            cartItem = await CartItem.findAll({
                where: {
                    cartId: cart.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        }
        res.status(200).json({ "cart": cart, "Items": cartItem, "Out_of_stocks": stockChangedProduct, "Price_changed": priceChangedProduct })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.decQty = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: {
                userId: req.userId
            },
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cartProduct = await CartItem.findOne({
            where: {
                productId: req.params.productId,
                cartId: cart.id
            }
        })
        if (!cartProduct) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }
        if (cartProduct.qty > 1) {
            await CartItem.update(
                {
                    qty: cartProduct.qty - 1
                },
                {
                    where: {
                        productId: cartProduct.productId,
                        cartId: cart.id
                    }
                }
            );
        } else {
            return res.status(400).json({ message: "Qty less than 1" })
        }
        const itemsCount = await CartItem.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('qty')), 'result']
            ],
            where: {
                cartId: cart.id
            }
        });
        const total = await CartItem.findAll({
            attributes: [[sequelize.literal('SUM(price * qty)'), 'result']],
            where: {
                cartId: cart.id
            }
        })
        cart.itemsCount = itemsCount[0].dataValues.result ? itemsCount[0].dataValues.result : "0"
        cart.save();
        cart.total = total[0].dataValues.result ? total[0].dataValues.result : "0"
        cart.save();
        cartItem = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({ "cart": cart, "Items": cartItem });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: {
                userId: req.userId
            }
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cartProduct = await CartItem.findOne({
            where: {
                productId: req.params.productId,
                cartId: cart.id
            }
        })
        if (!cartProduct) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }
        await CartItem.destroy({
            where: {
                productId: req.params.productId,
                cartId: cart.id
            }
        })
        const itemsCount = await CartItem.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('qty')), 'result']
            ],
            where: {
                cartId: cart.id
            }
        });
        const total = await CartItem.findAll({
            attributes: [[sequelize.literal('SUM(price * qty)'), 'result']],
            where: {
                cartId: cart.id
            }
        })
        cart.itemsCount = itemsCount[0].dataValues.result ? itemsCount[0].dataValues.result : "0"
        cart.save();
        cart.total = total[0].dataValues.result ? total[0].dataValues.result : "0"
        cart.save();
        cartItem = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({ "cart": cart, "Items": cartItem });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}