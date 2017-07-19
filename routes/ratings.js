var express = require('express');
var router  = express.Router();

var Recipe  = require('../models/recipes');
var User    = require('../models/users');


/*==============================
    Add New Rating
================================*/
// router.post('/', function (req, res, next) {
//     User.findById('596fae299366f2056ceb7e44', function(err, user){
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not authenticated!',
//                 error: err
//             });
//         }
//         var recipe = new Recipe({
//             recipeName: 'Recipe for Breakfast',
//             recipeContent: 'Lorem ipsum dolor set umit. Lorem ipsum dolor set umit...',
//             createdFrom: '596fae299366f2056ceb7e44',
//         });

//         // Save
//         recipe.save(function(err, result) {
//             if(err){
//                 return res.status(500).json({
//                     title: 'An error occured',
//                     error: err
//                 });
//             }
            
//             // Save Recipe
//             user.userRecipes.push(result);
//             user.save();

//             res.status(201).json({
//                 recipe: 'Saved recipe.',
//                 obj: result
//             });
//         });
//         console.log(user);
//     });    
// });