var express = require('express');
var router  = express.Router();

var Recipes  = require('../models/recipes');
var Comment  = require('../models/comments');


/*==============================
    Add New Comment
================================*/
router.post('/', function (req, res, next) {
    Recipes.findById('596fb03119f5e7053848a89f', function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }
        var comment = new Comment({
            comment: 'My New Comment',
            commentedBy: '596fae299366f2056ceb7e44',
            comentedRecipe: '596fb03119f5e7053848a89f'
        });

        // Save
        comment.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            
            // Save Comment
            recipe.recipeComments.push(result);
            recipe.save();

            res.status(201).json({
                comment: 'Comment is saved.',
                obj: result
            });
        });
    });    
});


/*=============================
    Delete Comment
===============================*/
router.delete('/:id', function(req, res, next){
    Comment.findById('596fbbbb7b28d712dc501714', function(err, comment){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // Remove Comment
        comment.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured during removing comment...',
                    error: err
                });
            }
            res.status(200).json({
                recipe: 'Deleted comment!',
                obj: result
            });
        });
    });
});




module.exports = router;