var express  = require('express');
var router   = express.Router();
var jwt      = require('jsonwebtoken');

var Recipes  = require('../models/recipes');
var Category = require('../models/categories');



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