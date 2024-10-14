const { authJwt } = require('../middleware');
const controller = require('../controllers/cart.controller');
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        '/api/cart',
        [authJwt.verifyToken],
        (req, res) => {
            controller.addToCart(req, res);
        }
    );

    app.get(
        '/api/cart',
        [authJwt.verifyToken],
        (req, res) => {
            controller.getCart(req, res);
        }
    );

    app.delete(
        '/api/cart/:productId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.deleteFromCart(req, res);
        }
    );

    app.put(
        '/api/cart/:productId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.decQty(req, res);
        }
    );
}