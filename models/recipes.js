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
    recipeGallery: {
        type: Array
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: Array
    },
    createdFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipeDelete: {
        type: Boolean
    },
    recipeGalleryImages: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery'
    },
    recipeRating: {
        type: Schema.Types.ObjectId,
        ref: 'Ratings'
    },
    recipeComments: {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }
});


module.exports = mongoose.model(
    'Recipes',
    schema
);