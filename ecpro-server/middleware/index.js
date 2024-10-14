const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const upload = require("./upload");
const uploadPath = require("./uploadPath");
const verifyOtp = require("./verifyOtp");

module.exports = {
    authJwt,
    verifySignUp,
    upload,
    uploadPath,
    verifyOtp
}