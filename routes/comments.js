var express   = require('express');
var router    = express.Router();
var sanitize  = require("mongo-sanitize");
var jwt       = require('jsonwebtoken');
var _         = require('lodash');

var Recipes  = require('../models/recipes');
var Comment  = require('../models/comments');




/*=====================================
    Get Comments for specific recipe 
    (single page)
=======================================*/
router.get('/:id', function(req, res, next) {
    Recipes.findById(req.params.id)
    .select('recipeComments')
    .populate({
        path: 'createdFrom recipeComments recipeCategories recipeRating',
        select: ('username profileImage comment commentedBy dateCreated currentUserId approve'),
        populate: {
            path: 'commentedBy',
            select: 'username profileImage',
        },
        options: { sort: { dateCreated: -1 } }
    })
    .sort({ occupation: -1 })
    .exec( function (err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting recipe information...'}
            });
        }
        
        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*=============================
    Protect Route
===============================*/
router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'You dont have role to get this data. Check out validation of your account....'}
            });
        }
        next();
    })
});


/*=============================
    Add New Comment
===============================*/
router.post('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Recipes.findById(req.params.id, function(err, recipe){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: {message: 'You dont have role to get this data...'}
            });
        }

        var sanitizedContent = sanitize(req.body.body).split('"').join('');

        var comment = new Comment({
            comment: sanitizedContent,
            commentedBy: decoded.user._id,
            comentedRecipe: req.params.id
        });

        // Save
        comment.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with adding new comment...'}
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