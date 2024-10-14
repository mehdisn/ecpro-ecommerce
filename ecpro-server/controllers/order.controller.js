const _ = require('lodash');
const db = require('../models');
const Address = db.Address;
const Op = db.Sequelize.Op;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Cart = db.Cart;
const CartItems = db.CartItems;
const Product = db.Product;
const configSMS = require('../config/sms.config');

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.userId
            }
        });
        const cartItems = await CartItems.findAll({
            where: {
                cartId: cart.id
            }
        });
        if (!cartItems || cartItems.length === 0) {
            return res.status(403).json({ message: "Your cart is empty!" });
        }
        const address = await Address.findOne({
            where: { id: req.body.addressId }
        });
        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }
        const order = await Order.create({
            userId: req.userId,
            addressId: req.body.addressId,
            amount: cart.total,
            trackingNumber: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
        });
        let product;
        cartItems.map(async item => {
            await OrderItem.create({
                name: item.name,
                orderId: order.id,
                productId: item.productId,
                price: item.price,
                qty: item.qty,
                defaultPictureUrl: item.defaultPictureUrl
            });
            product = await Product.findOne({ where: { id: item.productId } });
            await Product.update({
                stock: product.stock - item.qty,
                salesCount: product.salesCount + item.qty
            }, {
                where: { id: item.productId },
                individualHooks: true
            })
        })
        await CartItems.destroy({
            where: {
                cartId: cart.id
            }
        });
        configSMS.sendSMS(address.phoneNumber,
            `مشتری گرامی.
ضمن تشکر از خرید شما. سفارش شما با کد پیگیری ${order.trackingNumber}
ثبت شد.`)
        res.status(200).json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.getOrders = async (req, res) => {
    try {
        let limit = 20;   // number of records per page
        let offset = 0;
        const data = Order.findAndCountAll()
        let page = req.query.page || 1;      // page number
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        let orders;
        orders = await Order.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                orderStatus: { [Op.like]: `%${req.query.status ? req.query.status : ''}%` },
                trackingNumber: { [Op.like]: `%${req.query.trackingNumber ? req.query.trackingNumber : ''}%` }
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        res.status(200).json({ 'result': orders, 'count': data.count, 'pages': pages });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findOne({
            include: [
                {
                    model: Address
                },
                {
                    model: OrderItem,
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            ],
            where: {
                id: req.params.orderId
            }
        })
        res.status(200).json(order);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.changeOrderStatus = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.orderId
            }
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }
        Order.update({
            orderStatus: "sent"
        }, {
            where: { id: order.id }
        })
        res.status(200).json({ message: "Order updated" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
