const _ = require('lodash');
const db = require('../models');
const Address = db.Address;
const Sequelize = db.Sequelize;

exports.createAddress = async (req, res) => {
    const { firstName, lastName, city, address, zipCode, phoneNumber } = req.body;
    try {
        await Address.create({
            firstName,
            lastName,
            city,
            address,
            zipCode,
            phoneNumber,
            userId: req.userId
        });
        const _address = await Address.findAll({
            where: {
                userId: req.userId,
                deleted: false
            }
        });
        res.status(200).json(_address);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.getAddresses = async (req, res) => {
    try {
        const address = await Address.findAll({
            where: {
                userId: req.userId,
                deleted: false
            }
        });
        res.status(200).json(address);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

exports.deleteAddress = async (req, res) => {
    try {
        let address = await Address.findOne({
            where: {
                id: req.params.addressId,
                userId: req.userId,
                deleted: false
            }
        });
        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }
        if (address.selected === true) {
            return res.status(400).json({ message: "Selected address could not be deleted!!" });
        }
        await Address.update({
            deleted: true
        }, {
            where: { id: address.id }
        })
        const _address = await Address.findAll({
            where: {
                userId: req.userId,
                deleted: false
            }
        });
        res.status(200).json(_address);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

exports.setSelectedAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            where: {
                id: req.params.addressId,
                userId: req.userId,
                deleted: false
            }
        });
        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }
        await Address.update({
            selected: true
        }, {
            where: { id: address.id }
        })
        await Address.update({
            selected: false
        }, {
            where: {
                id: {
                    [Sequelize.Op.not]: address.id,
                },
                userId: req.userId
            }
        })
        const updatedAddress = await Address.findOne({
            where: {
                id: req.params.addressId,
                userId: req.userId
            }
        });
        res.status(200).json(updatedAddress);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.getSelectedAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            where: {
                selected: true,
                userId: req.userId,
                deleted: false
            }
        });
        if (!address) {
            return res.status(404).json({ message: "Address not found!" });
        }
        res.status(200).json(address);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
