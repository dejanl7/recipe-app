var express  = require('express');
var router   = express.Router();
var sanitize = require("mongo-sanitize");
var jwt      = require('jsonwebtoken');

var Recipes  = require('../models/recipes');
var Category = require('../models/categories');



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


/*==============================
    Get categories (by user)
================================*/
router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Category.find({ 'createdBy' : decoded.user._id})
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Getting categories info problem...'}
            });
        }
        res.status(200).json({
            title: 'Successfull getting categiries.',
            obj: result
        });
    });
});


/*====================================
    Get Category Info by category id
======================================*/
router.get('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    Category.findById(req.params.id)
    .select('categoryName categoryRecipe createdBy')
    .populate({
        path: 'categoryRecipe',
        select: 'recipeName'
    })
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting category information...'}
            });
        }
        if( result.createdBy != decoded.user._id ) {
            return res.status(401).json({
                title: 'Blocked getting categories!',
                error: {message: 'You don\'t have role to get category info...'}
            })
        }
        res.status(200).json({
            title: 'Successfull getting categories information.',
            obj: result
        });
    });
});



/*==============================
    Update Category Name
================================*/
router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Category.findById(req.params.id, function(err, category) {
        if(err) {
            return res.status(500).json({
                title: 'Problem occured..',
                error: { message: 'An error occured during the update category...' }
            });
        }
        if(!category) {
            return res.status(500).json({
                title: 'No Categories Found...',
                error: { message: 'Category not found...' }
            });
        }
        if(category.createdBy != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated...',
                error: { message: 'You dont have role to get this data...' }
            });
        }

        // Sanitize records and save recipe updated
        sanitizedContent = sanitize(req.body);
        var cleanBody = sanitizedContent.body.replace(/[^a-zA-Z 0-9 _À-ž.-]/g, "");
        category.categoryName = cleanBody || category.categoryName;

       
        category.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving categories...'}
                });
            }
            res.status(201).json({
                title: 'Updated category.',
                obj: result
            });
        });
    });
});


/*==========================
    Delete category
============================*/
router.delete('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    Category.findById(req.params.id, function(err, category){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with removing category...'}
            });
        }
       if(category.createdBy != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'You must be registered if you want to approach to this route...'}
            })
        }

        sanitizedContent = sanitize(req.body.content);
        
        var recipeIds = [];
        for (var c=0; c<sanitizedContent.length; c++) {
            recipeIds.push(sanitizedContent[c]._id);
        }

        Recipes.find({ _id: {$in: recipeIds} }, function(err, recipe) {
            for( var r=0; r<recipe.length; r++ ) {
                recipe[r].recipeCategories.pull(category._id);
                recipe[r].save();
            }
        });

        // Remove category  
        category.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with delete category...'}
                });
            }
            res.status(200).json({
                title: 'Deleted category!',
                obj: result
            });
        });
    });
});


/*====================================
    Remove recipe from category
=======================================*/
router.patch('/delete/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Category.findById(req.params.id, function(err, category) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: { message: 'Problem with update category...' }
            });
        }
        if(!category) {
            return res.status(500).json({
                title: 'No Categories Found...',
                error: { message: 'Category not found...' }
            });
        }
        if(category.createdBy != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated...',
                error: {message: 'You dont have role to delete this data...'}
            });
        }

        // Sanitize records and save category updated
        var sanitizedId = sanitize(req.params.id);
        var sanitizedContent = sanitize(req.body);
        var recId = sanitizedContent.body.split('"').join('');

        category.categoryRecipe.pull(recId);

        Recipes.findById(recId, function(rErr, recipe) {
            if (recipe) {
                recipe.recipeCategories.pull(category._id);
                recipe.save();
            }
        });

        category.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saved changed information...'}
                });
            }
            res.status(201).json({
                title: 'Updated category.',
                obj: result
            });
        });
    });
});


/*====================================
    Remove category from recipe and
    update status
=======================================*/
router.patch('/delete-recipe-category/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);  

    Category.findById(req.params.id, function(err, category) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with update category and recipe...'}
            });
        }
        if(!category) {
            return res.status(500).json({
                title: 'No Categories Found',
                error: { message: 'Category not found...' }
            });
        }
        if(category.createdBy != decoded.user._id) {
            return res.status(500).json({
                title: 'Not authenticated',
                error: {message: 'You dont have role to get this data...'}
            });
        }

        // Sanitize records and save category updated
        var sanitizedContent = sanitize(req.body);
        var recipeId = sanitizedContent.body.split('"').join('');
        category.categoryRecipe.pull(recipeId);

        Recipes.findById(recipeId, function(rErr, recipe) {
            if (recipe) {
                recipe.recipeCategories.pull(category._id);
                recipe.save();
            }
        });

        category.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving changes...'}
                });
            }
            res.status(201).json({
                title: 'Updated category.',
                obj: result
            });
        });
    });
});



module.exports = router;