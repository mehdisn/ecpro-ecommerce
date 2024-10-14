const { authJwt } = require('../middleware');
const controller = require('../controllers/comment.controller');
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
        '/api/product/comment',
        [authJwt.verifyToken],
        (req, res) => {
            controller.createComment(req, res);
        }
    );

    app.get(
        '/api/comment',
        (req, res) => {
            controller.findProductComments(req, res);
        }
    );

    app.put(
        '/api/product/comment/:commentId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.updatComment(req, res);
        }
    );

    app.delete(
        '/api/product/comment/:commentId',
        [authJwt.verifyToken],
        (req, res) => {
            controller.deleteComment(req, res);
        }
    );
}