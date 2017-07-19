var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Blueprint for Gallery Document
var schema  = new Schema({
    categoryName: {
        type: String
    },
    categoryRecipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model(
    'Categories',
    schema
);