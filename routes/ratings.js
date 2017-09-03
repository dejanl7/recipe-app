var express = require('express');
var router  = express.Router();


var User    = require('../models/users');
var Recipe  = require('../models/recipes');
var Rating  = require('../models/ratings');


/*==============================
    Add New Rating
================================*/
router.post('/', function (req, res, next) {
    Recipe.findById('59a3d65e36df220624c31a5e', function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var rating = new Rating({
            rating: 1,
            ratedFrom: '597f904f03f1e21ec873e89f',
            recipeRated: '59a3d65e36df220624c31a5e',
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