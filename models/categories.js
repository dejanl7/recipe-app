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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
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