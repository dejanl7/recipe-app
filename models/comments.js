var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Recipe   = require('./recipes');


/*=====================================
    Blueprint for Ratings Collection
=======================================*/
var schema = new Schema({
    comment: {
        type: String
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    comentedRecipe: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }],
    approve: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateApproved: {
        type: Date
    }
});



/*===============================
    Additional actions
=================================*/
schema.post('remove', function(comment) {
    Recipe.findById(comment.comentedRecipe, function(err, recipe) {
        recipe.recipeComments.pull(comment);
        recipe.save();
    });
});



module.exports = mongoose.model(
    'Comments',
    schema
)