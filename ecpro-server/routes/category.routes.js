const _ = require('lodash');
const controller = require('../controllers/category.controller');
const { upload, authJwt, uploadPath } = require('../middleware');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/category/',
        [
            uploadPath.set('public/images/categoryImages/'),
            upload.single('categoryimage'),
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.createCategory(req, res)
        }
    );

    app.put('/api/category/:categoryId',
        [
            uploadPath.set('public/images/categoryImages/'),
            upload.single('categoryimage'),
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.updateCategory(req, res)
        }
    );

    app.post('/api/category/all', [],
        (req, res) => {
            controller.findAllCategories(req, res)
        }
    );

    app.post('/api/category/head', [],
        (req, res) => {
            controller.findHeadCategories(req, res)
        }
    );

    // app.get('/api/category/:categoryId', [],
    //     (req, res) => {
    //         controller.findById(req, res)
    //     }
    // );

    app.delete('/api/category/:categoryId',
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.deleteCategory(req, res)
        }
    );
}