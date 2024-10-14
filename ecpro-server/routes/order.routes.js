const _ = require('lodash');
const controller = require('../controllers/order.controller');
const { authJwt, uploadPath } = require('../middleware');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/order/', [authJwt.verifyToken],
        (req, res) => {
            controller.createOrder(req, res)
        }
    );

    app.get('/api/order/', [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
        (req, res) => {
            controller.getOrders(req, res)
        }
    );

    app.get('/api/order/:orderId', [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
        (req, res) => {
            controller.getOrderDetails(req, res)
        }
    );

    app.put('/api/order/:orderId', [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
        (req, res) => {
            controller.changeOrderStatus(req, res)
        }
    );
}