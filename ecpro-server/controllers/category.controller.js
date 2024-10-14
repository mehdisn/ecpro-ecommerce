const _ = require('lodash');
const db = require('../models');
const Category = db.Category;
const fileHelper = require('../util/fileHelper');

// USE .split("public/").pop() IN FRONT

exports.createCategory = async (req, res) => {
    const { name, parentId } = req.body;
    const image = req.file ? req.file : { path: 'public/images/productImages/no-image.jpg' };
    var cate;
    try {
        if (parentId) {
            cate = await Category.findOne({
                where: {
                    id: parentId
                }
            });
            if (!cate) {
                return res.json({ message: 'Invalid parent id!' });
            }
        }
        const category = await Category.create({
            name,
            pictureUrl: image.path,
            parentId: cate ? cate.id : null
        });
        res.status(200).json({ message: 'Category created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.findAllCategories = async (req, res) => {
    try {
        const categories = await Category.scope('withoutDate').findAll({
            include: [
                {
                    model: Category,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    as: 'childs'
                }
            ],
            order: [
                ['name', 'ASC']
            ],
            limit: req.body.limit ? req.body.limit : null
        });
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.findHeadCategories = async (req, res) => {
    try {
        const categories = await Category.scope('withoutDate').findAll({
            include: [
                {
                    model: Category,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: Category,
                            order: [
                                ['createdAt', 'DESC']
                            ],
                            as: 'childs'
                        }
                    ],
                    as: 'childs'
                }
            ],
            where: {
                parentId: null
            },
            order: [
                ['name', 'ASC']
            ],
            limit: req.body.limit ? req.body.limit : null
        });
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updateCategory = async (req, res) => {
    const { name, parentId } = req.body;
    let image = req.file;
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.categoryId
            }
        })
        if (image) {
            image = req.file.path
            const lastImage = category.pictureUrl;
            !lastImage || lastImage === "public/images/productImages/no-image.png" ? null : fileHelper.deleteFile(lastImages)
        }
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        } else {
            await Category.update(
                {
                    name,
                    pictureUrl: image ? image : category.pictureUrl,
                    parentId: parentId,
                },
                {
                    where: { id: category.id }
                }
            );
            res.status(200).json({ message: "Category updated successfully" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.categoryId
            }
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const image = category.dataValues.pictureUrl;
        if (image) {
            fileHelper.deleteFile(image)
        }
        await Category.destroy({
            where: {
                id: category.id
            }
        });
        res.status(200).json({ message: 'Category successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}