const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({ data });
    });
};

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Category does not exist",
            });
        }
        req.category = category;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    // console.log('req.body', req.body);
    // console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;

    category.remove((err, deletedCategory) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json({
            deletedCategory,
            message: "Category deleted",
        });
    });

    // NOTES: from final-improvements
    // Product.find({ category }).exec((err, data) => {
    //     if (data.length >= 1) {
    //         return res.status(400).json({
    //             message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
    //         });
    //     } else {
    //         category.remove((err, data) => {
    //             if (err) {
    //                 return res.status(400).json({
    //                     error: errorHandler(err)
    //                 });
    //             }
    //             res.json({
    //                 message: 'Category deleted'
    //             });
    //         });
    //     }
    // });
};

exports.list = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        }
        res.json(categories);
    });
};
