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


module.exports = mongoose.model(
    'Images',
    schema
);