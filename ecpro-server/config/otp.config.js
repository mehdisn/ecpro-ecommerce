const speakeasy = require('speakeasy');

var token = (secret) => speakeasy.time({
    secret: secret,
    encoding: 'base32',
    step: 1200,//10 mins
})
var validate = (token, secret) => speakeasy.time.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    step: 1200,//10 mins
})
module.exports = {
    generateToken: token,
    validate
}
