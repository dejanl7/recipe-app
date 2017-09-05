var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


// Blueprint for Users Collection
var schema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
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
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    userRole: {
        type: Object,
        default: { roleType: 'viewer' , roles: [
            {'canManageRecipe': false}, 
            {'canLeaveRating': true}, 
            {'canBlockRecipeComments': false}, 
            {'canBuy': true },
            {'canMakeOrder': false}, 
            {'canManageUsers': false}, 
            {'canBlockUserComments': false}
        ]}
    },
    userBlocked: {
        type: Boolean,
        default: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateUpdated: {
        type: Date,
        default: Date.now()
    },
    userRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }],
    uploadedImages: [{
        type: Schema.Types.ObjectId,
        ref: 'Images'
    }]
});


// Plugin for checking unique records
schema.plugin(uniqueValidator);



module.exports = mongoose.model(
    'Users',
    schema
)