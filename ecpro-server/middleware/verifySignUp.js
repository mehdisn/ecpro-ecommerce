const db = require('../models');
const User = db.user;
const ROLES = db.ROLES;

checkDuplicatePhoneNumberOrEmail = (req, res, next) => {
    try {
        User.findOne({ where: { phoneNumber: req.body.phonenumber } }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! PhoneNumber is already in use!"
                });
                return;
            }
            User.findOne({ where: { email: req.body.email } }).then(user => {
                if (user) {
                    res.status(400).send({
                        message: "Failed! Email is already in use!"
                    });
                    return;
                }
                next();
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: err.message })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

checkRoleExisted = (req, res, next) => {
    try {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: "Failed! Role does not exist = " + req.body.roles[i]
                    });
                    return;
                }
            }
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

const verifySignUp = {
    checkDuplicatePhoneNumberOrEmail: checkDuplicatePhoneNumberOrEmail,
    checkRoleExisted: checkRoleExisted
}

module.exports = verifySignUp;