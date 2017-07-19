var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Blueprint for Recipes Document
var schema = new Schema({
    recipeName: {
        type: String
    },
    recipeContent: {
        type: String
    },
    recipeImage: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    recipeCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    createdFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipeDelete: {
        type: Boolean
    },
    recipeGallery: {
        type: Array
    },
    recipeRating: [{
        type: Schema.Types.ObjectId,
        ref: 'Ratings'
    }],
    recipeComments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});


module.exports = mongoose.model(
    'Recipes',
    schema
);