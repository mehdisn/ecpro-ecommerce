const { verifySignUp, verifyOtp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');
const Speakeasy = require('Speakeasy')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        [
            check('password')
                .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
                .matches(/\d/).withMessage('must contain a number'),
            check('phonenumber')
                .isLength({ min: 11, max: 11 }).withMessage('phonenumber is incorrect')
                .isInt(),
            check('email')
                .isEmail(),
            verifyOtp.verifyToken,
            verifySignUp.checkDuplicatePhoneNumberOrEmail,
            verifySignUp.checkRoleExisted
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array());
            } else {
                console.log(req.body)
                controller.signUp(req, res);
            }
        }
    );

    app.post(
        '/api/auth/otpgen',
        [
            check('phonenumber')
                .isLength({ min: 11, max: 11 }).withMessage('phonenumber is incorrect')
                .isInt(),
            verifySignUp.checkDuplicatePhoneNumberOrEmail,
        ],
        (req, res) => {
            req.secret = Speakeasy.generateSecret({ length: 8 }).base32;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array());
            } else {
                console.log(req.body)
                controller.otp2fa(req, res);
            }
        }
    );

    app.post(
        '/api/auth/reset/otpgen',
        [
            check('phonenumber')
                .isLength({ min: 11, max: 11 }).withMessage('phonenumber is incorrect')
                .isInt()
        ],
        (req, res) => {
            controller.otpForgot(req, res);
        }
    );

    app.post(
        '/api/auth/reset/otpverify',
        [verifyOtp.verifyToken],
        (req, res) => {
            controller.otpVerify(req, res);
        }
    );

    app.post(
        '/api/auth/reset/changepassword',
        [],
        (req, res) => {
            controller.forgotPassword(req, res);
        }
    );

    app.post(
        '/api/auth/signin',
        [],
        (req, res) => {
            controller.signIn(req, res)
        }
    );

    app.post(
        '/api/auth/bootstrap',
        [authJwt.verifyToken],
        (req, res) => {
            controller.tokenSignIn(req, res)
        }
    );

    app.post(
        '/api/users',
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.findAllUsers(req, res)
        }
    );

    app.put(
        '/api/users/:userId',
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        (req, res) => {
            controller.updateUserRole(req, res)
        }
    );
}
