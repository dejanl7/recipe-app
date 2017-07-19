var express = require('express');
var router  = express.Router();


var User    = require('../models/users');
var Recipe  = require('../models/recipes');
var Rating  = require('../models/ratings');


/*==============================
    Add New Rating
================================*/
router.post('/', function (req, res, next) {
    Recipe.findById('596fb03119f5e7053848a89f', function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var rating = new Rating({
            rating: 5,
            ratedFrom: '596fae299366f2056ceb7e44',
            recipeRated: '596fb03119f5e7053848a89f',
        });

        // Save
        rating.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            
            // Save Rating
            recipe.recipeRating.push(result);
            recipe.save();

            res.status(201).json({
                rating: 'Saved rating.',
                obj: result
            });
        });
    });    
});




module.exports = router;