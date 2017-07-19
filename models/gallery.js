var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Blueprint for Gallery Document
var schema  = new Schema({
    galleryImgs: {
        type: Array
    },
    forRecipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model(
    'Gallery',
    schema
);