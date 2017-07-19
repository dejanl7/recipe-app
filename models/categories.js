var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Recipe   = require('./recipes');


/*=====================================
    Blueprint for Category Collection
=======================================*/
var schema  = new Schema({
    categoryName: {
        type: String
    },
    categoryRecipe: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});



/*===============================
    Additional actions
=================================*/
schema.post('remove', function(category) {
    Recipe.findById(category.categoryRecipe, function(err, recipe) {
        recipe.recipeCategories.pull(category);
        recipe.save();
    });
});



module.exports = mongoose.model(
    'Categories',
    schema
);