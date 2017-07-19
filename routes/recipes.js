var express = require('express');
var router  = express.Router();

var Recipe  = require('../models/recipes');
var User    = require('../models/users');


/*==============================
    Add New Recipe
================================*/
router.post('/', function (req, res, next) {
    User.findById('596f779f9ab3c42664e8e8b8', function(err, user){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var recipe = new Recipe({
            recipeName: 'Recipe for Lunch',
            recipeContent: 'Lorem ipsum dolor set umit. Lorem ipsum dolor set umit...',
            createdFrom: '596f779f9ab3c42664e8e8b8',
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
    Recipe.findById('596f816777974414705e38b4', function(err, recipe){
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