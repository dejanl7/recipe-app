var express = require('express');
var router  = express.Router();
var multer  = require('multer');
var path    = require('path');

const fs    = require('fs');
var Images  = require('../models/images');



/*==============================
    Multer Settings
================================*/
// Storage Destination
var myTime = Date.now();

var storage = multer.diskStorage({
    destination: function(req, files, cb) {
        cb(null, 'public/images/uploaded')
    },
    filename: function(req, file, cb) {
        cb(null, myTime + '-' + file.originalname);
    }
});
// Filter image extension
var filterFiles = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
        cb(null, true);
        
};
// Filter size
var maxFileSize = 2621440;

// Upload
var upload = multer({ storage: storage, fileFilter: filterFiles, limits: {fileSize: maxFileSize} });



/*=============================
    Save Images
===============================*/
router.post('/', upload.any(), function(req, res, next) {  
    var arrayImgs = [];
    for(var i=0; i<req.files.length; i++){
        console.log(req.files[i].originalname);
        arrayImgs.push(req.protocol + '://' + req.get('host') + '/images/uploaded/' + myTime + '-' + req.files[i].originalname);
    }

    /*var contact = new Image({
        firstName: req.body.name,
        lastName: req.body.lastname,
        address: req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phone,
        profileImages: [arrayImgs]
    });
    console.log('Informacije: ' + contact);
    contact.save();*/
});


module.exports = router;