const _ = require('lodash');
const { Op } = require('sequelize');
const db = require('../models');
const sequelize = db.sequelize;
const ProductImage = db.ProductImage;
const ProductRate = db.ProductRate;
const Product = db.Product;
const Category = db.Category;
const Comment = db.Comment;
const fileHelper = require('../util/fileHelper');

// USE .split("public/").pop() IN FRONT

exports.createProduct = async (req, res) => {
    const { name, price, stock, manufacturer, size, color, description, specifications, category } = req.body;
    const image = req.files.map(file => file.path);
    var images = image.length === 0 ? ['public/images/productImages/no-image.jpg'] : req.files.map(file => file.path)
    var cate;
    try {
        if (!category) {
            return res.json({ message: 'Category can not be null!' });
        } else {
            cate = await Category.findAll({
                where: {
                    id: category
                }
            })
            if (!cate || cate.length === 0) {
                return res.status(404).json({ message: 'Category not found!' });
            }
        }
        const product = await Product.create({
            name,
            price,
            stock,
            manufacturer,
            size,
            color,
            description,
            specifications,
            defaultPictureUrl: images[0],
        });
        if (images) {
            for (let i = 0; i < images.length; i++) {
                await ProductImage.create({
                    pictureUrl: images[i],
                    productId: product.id
                });
            }
        }
        await product.setCategories(cate);
        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.findAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const offset = (page - 1) * pageSize;

        const products = await Product.findAndCountAll({
            attributes: ['id', 'name', 'price', 'defaultPictureUrl', 'createdAt', 'updatedAt'],
            limit: pageSize,
            offset: offset,
            order: [
                [req.body.order ? req.body.order : 'createdAt', 'DESC']
            ],
            where: {
                name: { [Op.like]: `%${req.body.productName ? req.body.productName : ''}%` }
            }
        });
        console.log(products)
        res.status(200).json({ 'result': products, 'count': products.count, 'pages': Math.ceil(products.count / pageSize) });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.findById = async (req, res) => {
    try {
        const product = await Product.findOne({
            attributes: [
                'name',
                'manufacturer',
                'price',
                'stock',
                'rate',
                'specifications',
                'color',
                'size',
                'description',
                'defaultPictureUrl',
                [sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.productId = ${req.params.productId})`), 'commentsCount']
            ],
            include: [
                {
                    model: ProductImage,
                    order: [
                        ['createdAt', 'DESC']
                    ]
                },
                {
                    model: Comment,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    limit: 3
                }
            ],
            where: {
                id: req.params.productId
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' })
        }
        // var pictures = [];
        // const images = await product.getImages();
        // for (let i = 0; i < images.length; i++) {
        //     pictures.push(images[i].pictureUrl);
        // }
        console.log(product)
        res.status(200).json({ product });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.findByCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const offset = (page - 1) * pageSize;
        const order = req.query.order || 'createdAt';
        let categoriesId = [];

        const categories = await Category.findOne({
            attributes: ['id'],
            include: [
                {
                    model: Category,
                    as: 'childs',
                    include: [
                        {
                            model: Category,
                            as: 'childs'
                        }
                    ]
                }
            ],
            where: {
                id: req.params.categoryId
            }
        })

        categoriesId.push(categories.id)
        for (let i = 0; i < categories.childs.length; i++) {
            categoriesId.push(categories.childs[i].id)
            for (let j = 0; j < categories.childs[i].childs.length; j++) {
                categoriesId.push(categories.childs[i].childs[j].id)
            }
        }

        const products = await Product.findAndCountAll({
            attributes: ['id', 'name', 'price', 'defaultPictureUrl', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Category,
                    where: {
                        id: {
                            [Op.in]: categoriesId
                        }
                    },
                    attributes: [],
                    through: {
                        attributes: []
                    }
                }
            ],
            order: [
                [order, 'DESC'],
            ],
            offset,
            limit: pageSize
        });

        res.status(200).json({ 'result': products, categories: categories, 'count': products.count, 'pages': Math.ceil(products.count / pageSize) });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.searchProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    try {
        const products = await Product.findAndCountAll({
            offset,
            limit: pageSize,
            where: {
                name: { [Op.like]: `%${req.query.productName}%` }
            }
        });
        res.status(200).json({ 'result': products, 'count': products.count, 'pages': pageSize });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productImages = await ProductImage.findAll({
            where: {
                productId: product.id
            }
        })
        if (productImages && productImages.length != 0) {
            for (let i = 0; i < productImages.length; i++) {
                fileHelper.deleteFile(productImages[i].dataValues.pictureUrl)
            }
        }
        await Product.destroy({
            where: {
                id: req.params.productId
            },
            individualHooks: true
        });
        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateProduct = async (req, res) => {
    const { name, price, stock, manufacturer, size, color, description, specifications } = req.body;
    var images;
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        })
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (req.files) {
            images = req.files.map(file => file.path)

            for (let i = 0; i < images.length; i++) {
                await ProductImage.create({
                    pictureUrl: images[i],
                    productId: product.id
                });
            }
        }
        await Product.update(
            {
                name,
                price,
                stock,
                manufacturer,
                size,
                color,
                description,
                specifications,
                defaultPictureUrl: images ? images[0] : null
            },
            {
                where: { id: product.id },
                individualHooks: true
            }
        );
        res.status(200).json({ message: "Product updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteProductImage = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productImage = await ProductImage.findOne({
            where: {
                pictureUrl: req.body.pictureUrl
            }
        })
        if (!productImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        fileHelper.deleteFile(productImage.pictureUrl)
        await ProductImage.destroy({
            where: {
                pictureUrl: productImage.pictureUrl
            }
        });
        res.status(200).json({ message: 'Product Image successfully deleted' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.rateToProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.productId
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productRate = await ProductRate.findOne({
            where: {
                productId: product.id,
                userId: req.userId
            }
        });
        if (productRate) {
            productRate.rate = req.body.rate;
            await productRate.save();
        } else {
            await ProductRate.create({
                productId: product.id,
                userId: req.userId,
                rate: req.body.rate
            })
        }
        const avrage = await ProductRate.findAll({
            attributes: [
                [sequelize.fn('avg', sequelize.col('rate')), 'result']
            ]
        })
        product.rate = avrage[0].dataValues.result;
        product.save();
        res.status(200).json({ message: 'Success' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}