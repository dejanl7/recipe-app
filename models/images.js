var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Users    = require('./users');


/*=====================================
    Blueprint for Image Collection
=======================================*/
var schema  = new Schema({
    imageName: {
        type: String
    },
    newImageName: {
        type: String
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    imageSize: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    imagePath: {
        type: String
    }
});


/*===============================
    Additional actions
=================================*/
schema.post('remove', function(image) {
    Users.findById(image.uploadedBy, function(err, user) {
        user.uploadedImages.pull(image);
        user.save();
    });
});



module.exports = mongoose.model(
    'Images',
    schema
);