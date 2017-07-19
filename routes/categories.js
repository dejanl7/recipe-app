var express = require('express');
var router  = express.Router();

var Recipes  = require('../models/recipes');
var Category = require('../models/categories');


/*==============================
    Add New Category
================================*/
router.post('/', function (req, res, next) {
    Recipes.findById('596fb03119f5e7053848a89f', function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var category = new Category({
            categoryName: 'lunch',
            categoryRecipe: '596fb03119f5e7053848a89f'
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
    Delete Recipe
===============================*/
router.delete('/:id', function(req, res, next){
    Category.findById('596fb74a869cf827c4753d49', function(err, category){
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