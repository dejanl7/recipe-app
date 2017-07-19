var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


// Blueprint for Users Document
var schema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    profileImage: {
        type: String
    },
    userRole: {
        type: String,
        enum: ['admin', 'moderator', 'viewer'],
        default: 'moderator'
    },
    dateCreated: {
        type: Date,
        default: Data.now(),
        required: true
    },
    dateUpdated: {
        type: Date,
        default: Data.now()
    },
    userRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }]
});


// Plugin for checking unique records
schema.plugin(uniqueValidator);



module.exports = mongoose.model(
    'Users',
    schema
)