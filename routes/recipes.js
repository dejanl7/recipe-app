var express  = require('express');
var router   = express.Router();
var jwt      = require('jsonwebtoken');
var sanitize = require("mongo-sanitize");
var _        = require('lodash');

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
                title: 'Problem occured',
                error: {message: 'Not authenticated! Check account validation...'}
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
        },
        options: { sort: { _id: -1 } }
    })
    .sort({ occupation: -1 })
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting information about recipes...'}
            });
        }
        if(result._id != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to get user information!',
                error: {message: 'You must be registered if you want to approach to this route.'}
            })
        }
        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*=============================
    Get recipe info
===============================*/
router.get('/unique/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Recipe.findById(req.params.id)
    .populate('recipeCategories')
    .exec( function (err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting recipe information...'}
            });
        }
        if(result.createdFrom != decoded.user._id) {
            return res.status(401).json({
                title: 'An error occured',
                error: {message: 'You must be registered if you want to approach to this route.'}
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
                title: 'An error occured',
                error: {message: 'Problem with adding new recipe...'}
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
                    error: {message: 'Problem with saving recipe...'}
                });
            }

            // Push recipe to user table
            user.userRecipes.push(result);
            user.save();

            // Save Category
            if( sanitizedContent.categories ) {
                Category.find({ 'createdBy' : decoded.user._id})
                .exec(function(categoryError, category) {
                    newCArray = [];
                    for ( var cat=0; cat<category.length; cat++ ) {
                        newCArray.push(category[cat].categoryName);
                    }
                    var sameValues = _.intersectionWith(newCArray, sanitizedContent.categories, _.isEqual);
                    var dif = _.difference( sanitizedContent.categories, newCArray, _.isEqual);

                    if( dif.length > 0 ) {
                        for( var tc=0; tc<dif.length; tc++ ) {
                            newCategoryArray = [];
                            var categoryNew = new Category({
                                categoryName: dif[tc],
                                createdBy: user._id,
                                categoryRecipe: result._id
                            });
                            categoryNew.save();
                            
                            newCategoryArray.push(categoryNew._id);
                            for( var nca=0; nca<dif.length; nca++) {
                                result.recipeCategories.push(newCategoryArray[nca]);
                            }               
                        }
                    }
                    if( sameValues.length > 0 ) {
                        for( var x=0; x<sameValues.length; x++ ) {
                            category[newCArray.indexOf(sameValues[x].toString())].categoryRecipe.push(result._id);
                            result.recipeCategories.push(category[newCArray.indexOf(sameValues[x].toString())]);
                            category[newCArray.indexOf(sameValues[x].toString())].save();
                        }
                    }
                  
                    result.save();
                });
            }

            // Return status
            return res.status(201).json({
                title: 'Saved recipe.',
                obj: result
            });
        });
    });
});


/*=========================
    Update status
===========================*/
router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with updating recipes information...'}
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No Recipes',
                error: { message: 'Recipe not found...' }
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated',
                error: {message: 'You must be registered if you want to approach to this route.'}
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        recipe.recipePublish = sanitizedContent.body || recipe.recipePublish;
       
        recipe.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving recipe...'}
                });
            }
            res.status(201).json({
                title: 'Updated recipe.',
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

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with move recipe to trash...'}
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No Recipe',
                error: { recipe: 'Recipe not found...' }
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated',
                error: {message: 'You must be registered if you want to approach to this route...'}
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        recipe.recipeDeleted = sanitizedContent.body || recipe.recipeDeleted;
       
        recipe.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving removed recipe into trash basket...'}
                });
            }
            res.status(201).json({
                title: 'Deleted recipe.',
                obj: result
            });
        });
    });
});


/*==========================
    Delete recipe (by id)
============================*/
router.delete('/delete/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    Recipe.findById(req.params.id, function(err, recipe){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with removing recipe...'}
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'You must be registered if you want to approach to this route...'}
            })
        }

        // Remove recipe  
        recipe.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with delete recipe...'}
                });
            }
            res.status(200).json({
                title: 'Deleted recipe!',
                obj: result
            });
        });
    });
});


/*=========================
    Update recipe info
===========================*/
router.patch('/edit/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with update recipe info...'}
            });
        }
        if(!recipe) {
            return res.status(500).json({
                title: 'No Recipes Found',
                error: { message: 'Recipe not found...' }
            });
        }
        if(recipe.createdFrom != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated',
                error: {message: 'You must be registered if you want to approach to this route...'}
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        recipe.recipeName       = sanitizedContent.title || recipe.recipeName;
        recipe.recipeContent    = sanitizedContent.content || recipe.recipeContent;
        recipe.recipeImage      = sanitizedContent.attachment || recipe.recipeImage;
        recipe.recipeGallery    = sanitizedContent.galleryImages || recipe.recipeGallery;

        // Update Recipe
        recipe.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving edited changes...'}
                });
            }
            // Save Category
            if( sanitizedContent.categories ) {
                Category.find({ 'createdBy' : decoded.user._id})
                .exec(function(categoryError, category) {
                    allCategoriesName = [];
                    allCategoryIds = [];
                    reqCategoryNames = [];
                    
                    // Get category name array for all database categories
                    for ( var cat=0; cat<category.length; cat++ ) {
                        allCategoryIds.push(category[cat]._id);
                        allCategoriesName.push(category[cat].categoryName);
                    }
                    // Get category name of categories from request
                    for ( var i=0; i<sanitizedContent.categories.length; i++ ) {
                        if ( sanitizedContent.categories[i].categoryName ) {
                            reqCategoryNames.push(sanitizedContent.categories[i].categoryName);
                        }
                        else {
                            reqCategoryNames = sanitizedContent.categories;
                        }
                    }
                                                        
                    var dbEqReq = _.intersectionWith(allCategoriesName, reqCategoryNames, _.isEqual); // Get the same categories from db and from request
                    var dif     = _.difference( reqCategoryNames, allCategoriesName, _.isEqual); // Difference between requested categories and db categories     

                    if( dif.length > 0 ) {
                        for( var tc=0; tc<dif.length; tc++ ) {
                            newCategoryArray = [];
                            var categoryNew = new Category({
                                categoryName: dif[tc],
                                createdBy: recipe.createdFrom,
                                categoryRecipe: result._id
                            });
                            newCategoryArray.push(categoryNew._id);
                            categoryNew.save();    
                            
                            for( var nca=0; nca<newCategoryArray.length; nca++) {
                                result.recipeCategories.push(newCategoryArray[nca]);
                            }    
                        }
                    }
                    if( dbEqReq.length > 0 ) {
                        for( let x=0; x<dbEqReq.length; x++ ) {
                            var recordPosition = allCategoriesName.indexOf(dbEqReq[x].toString());
                            if( recipe.recipeCategories.indexOf(category[recordPosition]._id) == -1 ) {
                                category[recordPosition].categoryRecipe.push(result._id);
                                result.recipeCategories.push(category[recordPosition]);
                                category[recordPosition].save();
                            }
                        }
                    }
                  
                    result.save();
                });
            }

            res.status(201).json({
                message: 'Updated recipe.',
                obj: result
            });
        });
    });
});




module.exports = router;