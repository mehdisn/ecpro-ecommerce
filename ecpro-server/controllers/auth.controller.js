const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const configSMS = require('../config/sms.config');
const configOtp = require('../config/otp.config');

exports.signUp = async (req, res) => {
    try {
        const user = await User.create({
            fullName: req.body.fullname,
            phoneNumber: req.body.phonenumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            await user.setRoles(roles);
        } else {
            await user.setRoles([1]);
        }
        var token = jwt.sign({ id: user.id }, config.secret, {});

        var authorities = [];
        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user.id,
            fullname: user.fullName,
            phonenumber: user.phoneNumber,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ phoneNumber: req.body.input }, { email: req.body.input }]
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'Invalid password!'
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {});

        var authorities = [];
        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).json({
            id: user.id,
            fullname: user.fullName,
            phonenumber: user.phoneNumber,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.tokenSignIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        var authorities = [];
        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).json({
            id: user.id,
            fullname: user.fullName,
            phonenumber: user.phoneNumber,
            email: user.email,
            roles: authorities
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.otp2fa = async (req, res) => {
    const phoneNumber = req.body.phonenumber;
    try {
        configSMS.sendSMS(phoneNumber,
            `به آوانوس خوش آمدید.
شما میتوانید ثبت نام خود را با استفاده از کد فعالسازی زیر تکمیل کنید.
کد فعالسازی: ${configOtp.generateToken(req.secret)}`
        )
        res.status(200).json({ message: "Code was successfully sent", secret: req.secret });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.otpForgot = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                phoneNumber: req.body.phonenumber
            }
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        configSMS.sendSMS(user.phoneNumber,
            `${user.fullName} عزیز
شما میتوانید با استفاده از کد زیر گذرواژه ی خود را بازیابی کنید.
کد بازیابی: ${configOtp.generateToken(req.body.secret)}`
        )
        res.status(200).json({ message: "Code was successfully sent" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.otpVerify = async (req, res) => {
    const token = req.body.token;
    try {
        User.update(
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 600000 // 10 minutes
            },
            {
                where: { phoneNumber: req.body.phonenumber }
            }
        )
        res.status(200).json({ message: "Code was successfully verifyed" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


exports.forgotPassword = async (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 10)
    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: req.body.token,
                resetPasswordExpires: {
                    [Op.gt]: Date.now()
                }
            }
        });
        if (!user) {
            return res.status(403).json({ message: "Token timed out" });
        }
        await User.update(
            {
                password: password
            },
            {
                where: { id: user.id }
            }
        );
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


exports.findAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const offset = (page - 1) * pageSize;

        const users = await User.findAll({
            attributes: ['id', 'fullName', 'phoneNumber', 'Email', 'createdAt', 'updatedAt'],
            limit: pageSize,
            offset: offset,
            order: [
                [req.body.order ? req.body.order : 'createdAt', 'DESC']
            ],
            include: [
                {
                    model: Role,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        name: { [Op.like]: `%${req.body.role ? req.body.role : ''}%` },
                    },
                    through: {
                        attributes: []
                    }
                }
            ],
            where: {
                email: { [Op.like]: `%${req.body.email ? req.body.email : ''}%` },
                phoneNumber: { [Op.like]: `%${req.body.phoneNumber ? req.body.phoneNumber : ''}%` }
            }
        });
        console.log(users.length)
        res.status(200).json({ 'result': users, 'count': users.length, 'pages': Math.ceil(users.length / pageSize) });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}


exports.updateUserRole = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        })
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        if (user.id === req.userId) {
            return res.status(401).json({ message: "You can not change your role!" });
        }

        const roles = await Role.findAll({
            where: {
                name: req.body.roles
            }
        })
        await user.setRoles(roles);
        console.log(roles)
        res.status(200).json({ message: "User role updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}