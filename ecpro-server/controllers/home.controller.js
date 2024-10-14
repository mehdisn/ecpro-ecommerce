const _ = require('lodash');
const { Op } = require('sequelize');
const db = require('../models');
const HomeSlider = db.HomeSlider;
const sequelize = db.sequelize;
const fileHelper = require('../util/fileHelper');

// USE .split("public/").pop() IN FRONT

exports.setSliderImage = async (req, res) => {
    const image = req.file;
    if (!image) return res.status(404).json({ message: 'image required!' });
    try {
        const homeSlider = await HomeSlider.create({
            pictureUrl: image.path,
            navigationLink: req.body.link,
            navigationPage: req.body.page
        });
        const sliderImages = await HomeSlider.findAll();
        res.status(200).json({ sliderImages });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getSliderImages = async (req, res) => {
    try {
        const sliderImages = await HomeSlider.findAll();
        res.status(200).json({ sliderImages });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.deleteSliderImage = async (req, res) => {
    try {
        const sliderImage = await HomeSlider.findOne({
            where: {
                id: req.params.imageId
            }
        });
        if (!sliderImage) {
            return res.status(404).json({ message: 'Image not found' });
        }
        fileHelper.deleteFile(sliderImage.pictureUrl)
        await HomeSlider.destroy({
            where: {
                id: req.params.imageId
            },
            individualHooks: true
        });
        const sliderImages = await HomeSlider.findAll();
        res.status(200).json({sliderImages});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}