var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Blueprint for Ratings Document
var schema = new Schema({
    comment: {
        type: Array
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
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


module.exports = mongoose.model(
    'Comments',
    schema
)