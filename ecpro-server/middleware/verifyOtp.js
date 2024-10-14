const configOtp = require('../config/otp.config');

verifyToken = (req, res, next) => {
    console.log(req.body)
    try {
        const validate = configOtp.validate(req.body.token, req.body.secret)
        if (validate) {
            next();
            return;
        } else {
            return res.status(404).json({ message: "Token is invalid" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

const verifyOtp = {
    verifyToken: verifyToken
}

module.exports = verifyOtp;