var express  = require('express');
var router   = express.Router();
var jwt      = require('jsonwebtoken');
var sanitize = require("mongo-sanitize");

var Recipe   = require('../models/recipes');
var User     = require('../models/users');
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


/*=============================
    Get recipes info
===============================*/
router.get('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    User.findById(req.params.id)
    .select('userRecipes')
    .populate({
        path: 'userRecipes',
        select: 'recipeName recipeContent recipeImage recipeCategories recipeComments recipeRating recipePublish recipeDeleted dateCreated',
        populate: {
            path: 'recipeCategories',
        }
    })
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured - getting recipes info problem...',
                error: err
            });
        }
        if(result._id != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to get user information!',
                error: err
            })
        }
        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*=============================
    Get recipes info
===============================*/
router.get('/unique/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Recipe.findById(req.params.id)
    .populate('recipeCategories')
    .exec( function (err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occured - getting recipe info problem...',
                error: err
            });
        }
        if(result.createdFrom != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to get user information!',
                error: err
            })
        }
        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*==============================
    Add New Recipe
================================*/
router.post('/', function (req, res, next) {
    var decoded          = jwt.decode(req.query.token);
    var sanitizedContent = sanitize(req.body);

    User.findById(decoded.user._id, function(err, user){
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated!',
                error: err
            });
        }      

        var recipe = new Recipe({
            recipeName: sanitizedContent.title,
            recipeContent: sanitizedContent.content,
            recipeImage: sanitizedContent.attachment,
            dateCreated: Date.now(),
            createdFrom: user._id,
            recipeGallery: sanitizedContent.galleryImages
        });

        // Save recipe
        recipe.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // Push recipe to user table
            user.userRecipes.push(result);
            user.save();

            // Save Category
            if( sanitizedContent.categories ) {
                Category.find()
                .exec(function(categoryError, category) {
                    // If category exist into database - update recipes fields
                    catArray = [];
                    for ( var cat=0; cat<category.length; cat++ ) {
                        catArray.push(category[cat].categoryName);
                    }
                    if( catArray.length < 1 ) {
                        for( var ec=0; ec<sanitizedContent.categories.length; ec++ ) {
                            console.log(sanitizedContent.categories[ec]);
                            newCategoryArray = [];
                            var categoryNew = new Category({
                                categoryName: sanitizedContent.categories[ec],
                                createdBy: user._id,
                                categoryRecipe: result._id
                            });
                            categoryNew.save();
                            newCategoryArray.push(categoryNew._id);
                            
                            for( var eca=0; eca<newCategoryArray.length; eca++) {
                                result.recipeCategories.push(newCategoryArray[eca]);
                                console.log(newCategoryArray[nca]);
                            }
                        }
                    }
                    for( var tc=0; tc<catArray.length; tc++ ) {
                        if (typeof sanitizedContent.categories[tc] !== 'undefined' ) {
                            if ( catArray.indexOf(sanitizedContent.categories[tc]) === -1 ) {
                                newCategoryArray = [];
                                var categoryNew = new Category({
                                    categoryName: sanitizedContent.categories[tc],
                                    createdBy: user._id,
                                    categoryRecipe: result._id
                                });
                                categoryNew.save();
                                
                                newCategoryArray.push(categoryNew._id);
                                for( var nca=0; nca<newCategoryArray.length; nca++) {
                                    result.recipeCategories.push(newCategoryArray[nca]);
                                    //console.log(newCategoryArray[nca]);
                                }
                            }                
                        }
                        if (catArray.indexOf(sanitizedContent.categories[tc]) > -1 ){
                            category[catArray.indexOf(sanitizedContent.categories[tc])].categoryRecipe.push(result._id);
                            result.recipeCategories.push(category[catArray.indexOf(sanitizedContent.categories[tc])]);
                            category[catArray.indexOf(sanitizedContent.categories[tc])].save();
                        }
                    }

                    result.save();
                });
            }

            // Return status
            return res.status(201).json({
                recipe: 'Saved recipe.',
                obj: result
            });
        });
    });
});


/*=========================
    Update recipe info
===========================*/
router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured during the update recipe...',
                error: err
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No Recipes Found...',
                error: { recipe: 'Recipe not found...' }
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated...',
                error: { recipe: 'Recipe not found...' }
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        recipe.recipePublish = sanitizedContent.body || recipe.recipePublish;
       
        recipe.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Updated recipe.',
                obj: result
            });
        });
    });
});


/*=========================
    Move to trash
===========================*/
router.patch('/delete/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  
    console.log(req.body);

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured during the delete recipe...',
                error: err
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No Recipes Found...',
                error: { user: 'Recipe not found...' }
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated...',
                error: { recipe: 'Recipe not found...' }
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        recipe.recipeDeleted = sanitizedContent.body || recipe.recipeDeleted;
       
        recipe.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Deletet recipe.',
                obj: result
            });
        });
    });
});



module.exports = router;