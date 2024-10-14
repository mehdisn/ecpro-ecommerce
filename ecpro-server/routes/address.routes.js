const { authJwt } = require('../middleware');
const controller = require('../controllers/address.controller');
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
        '/api/address',
        [authJwt.verifyToken],
        (req, res) => {
            controller.createAddress(req, res);
        }
    );

    app.get(
        '/api/address',
        [authJwt.verifyToken],
        (req, res) => {
            controller.getAddresses(req, res);
        }
    );

    app.delete(
        '/api/address/:addressId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.deleteAddress(req, res);
        }
    );

    app.put(
        '/api/address/:addressId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.setSelectedAddress(req, res);
        }
    );

    app.get(
        '/api/address/selected',
        [authJwt.verifyToken],
        (req, res) => {
            controller.getSelectedAddress(req, res);
        }
    );
}