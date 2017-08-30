var express  = require('express');
var router   = express.Router();
var sanitize = require("mongo-sanitize");
var jwt      = require('jsonwebtoken');

var Recipes  = require('../models/recipes');
var Category = require('../models/categories');



/*=============================
    Protect Route
===============================*/
router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated! Check out validation of your account.',
                error: err
            });
        }
        next();
    })
});


/*==============================
    Get categories (by user)
================================*/
router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Category.find({ 'createdBy' : decoded.user._id})
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured - getting categories info problem...',
                error: err
            });
        }
        res.status(200).json({
            title: 'Successfull getting categiries.',
            obj: result
        });
    });
});


/*====================================
    Remove recipe from category and
    update status
=======================================*/
router.patch('/delete-recipe-category/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Category.findById(req.params.id, function(err, category) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured during the update category and recipe...',
                error: err
            });
        }
        if(!category) {
            return res.status(500).json({
                title: 'No Categories Found...',
                error: { category: 'Category not found...' }
            });
        }
        if(category.createdBy != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated...',
                error: { category: 'Category not found...' }
            });
        }

        // Sanitize records and save category updated
        var sanitizedContent = sanitize(req.body);
        var recipeId = sanitizedContent.body.split('"').join('');
        category.categoryRecipe.pull(recipeId);

        Recipes.findById(recipeId, function(rErr, recipe) {
            if (recipe) {
                recipe.recipeCategories.pull(category._id);
                recipe.save();
            }
        });

        category.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Updated category.',
                obj: result
            });
        });
    });
});


/*==============================
    Add New Category
================================*/
router.post('/', function (req, res, next) {
    Recipes.findById('5998b9b79f08a42aecfc3d96', function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var category = new Category({
            categoryName: 'lunch',
            categoryRecipe: '5998b9b79f08a42aecfc3d96'
        });

        // Save
        category.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            
            // Save Category
            recipe.recipeCategories.push(result);
            recipe.save();

            res.status(201).json({
                category: 'Saved category.',
                obj: result
            });
        });
    });    
});


/*=============================
    Delete Category
===============================*/
router.delete('/:id', function(req, res, next){
    Category.findById('596fb715869cf827c4753d46', function(err, category){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // Remove Category
        category.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured during removing category...',
                    error: err
                });
            }
            res.status(200).json({
                recipe: 'Deleted category!',
                obj: result
            });
        });
    });
});



module.exports = router;