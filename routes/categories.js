var express = require('express');
var router  = express.Router();

var Category = require('../models/categories');

/*==============================
    Add New Category
================================*/
router.post('/', function (req, res, next) {
    var category = new Category({
        categoryName: 'lunch',
        categoryRecipe: ''
    });
    category.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});




module.exports = router;