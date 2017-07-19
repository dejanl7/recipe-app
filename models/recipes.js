var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Blueprint for Recipes Collection
var schema = new Schema({
    recipeName: {
        type: String,
        default: ''
    },
    recipeContent: {
        type: String,
        default: ''
    },
    recipeImage: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    recipeCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    }],
    createdFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipeRemoved: {
        type: Boolean,
        default: false
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


schema.post('remove', function(message) {
    User.findById(message.user, function(err, user) {
        user.messages.pull(message);
        user.save();
    });
});


module.exports = mongoose.model(
    'Recipes',
    schema
);