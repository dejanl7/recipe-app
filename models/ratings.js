var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Blueprint for Ratings Document
var schema = new Schema({
    rating: [{
        type: number
    }],
    ratedFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
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