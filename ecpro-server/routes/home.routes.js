const _ = require('lodash');
const controller = require('../controllers/home.controller');
const { upload, authJwt, uploadPath } = require('../middleware');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/homeSlider/',
        [
            uploadPath.set('public/images/homeSlider/'), upload.single('homeimage'),
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.setSliderImage(req, res)
        }
    );

    app.get('/api/homeSlider/', [],
        (req, res) => {
            controller.getSliderImages(req, res)
        }
    );

    app.delete('/api/homeSlider/:imageId',
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.deleteSliderImage(req, res)
        }
    );
}