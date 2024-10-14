const _ = require('lodash');
const controller = require('../controllers/product.controller');
const { upload, authJwt, uploadPath } = require('../middleware');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/product/',
        [
            uploadPath.set('public/images/productImages/'),
            upload.array('productimage'),
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.createProduct(req, res)
        }
    );

    app.put('/api/product/:productId',
        [
            upload.array('productimage'),
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.updateProduct(req, res)
        }
    );

    app.delete('/api/product/image/:productId', [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
        (req, res) => {
            controller.deleteProductImage(req, res)
        }
    );

    app.post('/api/product/all', [],
        (req, res) => {
            controller.findAllProducts(req, res)
        }
    );

    app.get('/api/product/category/:categoryId', [],
        (req, res) => {
            controller.findByCategory(req, res)
        }
    );

    app.get('/api/product/:productId', [],
        (req, res) => {
            controller.findById(req, res)
        }
    );

    app.get('/api/product/', [],
        (req, res) => {
            controller.searchProduct(req, res)
        }
    );

    app.delete('/api/product/:productId', [
        authJwt.verifyToken,
        authJwt.isAdmin
    ],
        (req, res) => {
            controller.deleteProduct(req, res)
        }
    );

    app.get('/api/product/rate/:productId', [
        authJwt.verifyToken,
    ],
        (req, res) => {
            controller.rateToProduct(req, res)
        }
    );
}