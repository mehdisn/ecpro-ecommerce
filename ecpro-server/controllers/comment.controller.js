const _ = require('lodash');
const db = require('../models');
const Comment = db.Comment;
const Product = db.Product;
const User = db.user;

exports.createComment = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.query.productId }
        })
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const user = await User.findOne({
            where: { id: req.userId }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Comment.create({
            title: req.body.title,
            content: req.body.content,
            fullName: user.fullName,
            userId: req.userId,
            productId: req.query.productId,
            rating: req.body.rating
        });
        res.status(200).json({ message: 'Comment created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

//TODO
exports.findNotAcceptedComments = async (req, res) => {

}

exports.findProductComments = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.query.productId }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const comments = await Comment.findAll({
            where: { productId: product.id },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(comments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updatComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.commentId
            }
        });
        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }
        Commnet.update({
            title: req.body.title,
            content: req.body.content,
            rating: req.body.rating
        }, {
            where: { id: comment.id }
        });
        res.status(200).json({ message: 'Comment successfully updated' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                id: req.params.commentId
            }
        });
        res.status(200).json({ message: 'Comment successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(err.response.status).json({ message: err.message })
    }
}