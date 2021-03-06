var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Recipe   = require('./recipes');


/*====================================
    Blueprint for Ratings Collection
======================================*/
var schema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    ratedFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipeRated: {
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});




module.exports = mongoose.model(
    'Ratings',
    schema
)