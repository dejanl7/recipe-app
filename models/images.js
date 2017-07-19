var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

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
    imageSize: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model(
    'Images',
    schema
);