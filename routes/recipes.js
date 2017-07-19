var express = require('express');
var router  = express.Router();

var Recipe  = require('../models/recipes');
var User    = require('../models/users');


/*=============================
  Get All Recipes
===============================*/
router.get('/', function(req, res, next){
    Recipe.find()
        .populate('createdFrom', 'firstName lastName username')
        .populate({
            path: 'recipeComments',
            populate: { path: 'commentedBy', select: 'username firstName lastName' }
        })
        .populate({
            path: 'recipeRating',
            select: 'ratedFrom rating',
            populate: { path: 'ratedFrom', select: 'username' }
        })
        .populate('recipeCategories', 'categoryName')
        .exec(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Successful getting data...',
                obj: result
            });
        });
});


/*==============================
    Add New Recipe
================================*/
router.post('/', function (req, res, next) {
    User.findById('596fae299366f2056ceb7e44', function(err, user){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var recipe = new Recipe({
            recipeName: 'Recipe for Breakfast',
            recipeContent: 'Lorem ipsum dolor set umit. Lorem ipsum dolor set umit...',
            createdFrom: '596fae299366f2056ceb7e44',
        });

        // Save
        recipe.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            
            // Save Recipe
            user.userRecipes.push(result);
            user.save();

            res.status(201).json({
                recipe: 'Saved recipe.',
                obj: result
            });
        });
        console.log(user);
    });    
});


/*=============================
    Delete Recipe
===============================*/
router.delete('/:id', function(req, res, next){
    Recipe.findById('596fb03219f5e7053848a8a0', function(err, recipe){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // Remove Recipe
        recipe.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured during removing recipe...',
                    error: err
                });
            }
            res.status(200).json({
                recipe: 'Deleted recipe!',
                obj: result
            });
        });
    });
});


module.exports = router;