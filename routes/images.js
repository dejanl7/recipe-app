var express = require('express');
var router  = express.Router();
var multer  = require('multer');
var path    = require('path');
var jwt     = require('jsonwebtoken');

const fs    = require('fs');
var Images  = require('../models/images');
var User    = require('../models/users');



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
// Filter file extension
var filterFiles = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
        cb(null, true);
        
};
var maxFileSize = 2621440;

var upload  = multer({ storage: storage, fileFilter: filterFiles, limits: {fileSize: maxFileSize} }).single('file');



/*=============================
    Protect Route
===============================*/
router.use('/', function(req, res, next) {
    const tokenVerification = req.query.token ? req.query.token : req.headers.authorization;

    jwt.verify(tokenVerification, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated! Check out validation of your account.',
                error: err
            });
        }
        next();
    })
});


/*=============================
    Save Images
===============================*/
router.post('/', function(req, res, next) { 
    var decoded = jwt.decode(req.headers.authorization);
    
    User.findById(decoded.user._id, function(err, user){
        upload(req, res, function(err){
            if(err){
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            
            // Save files in database
            var images = new Images({
                imageName: req.file.originalname,
                newImageName: myTime + '-' + req.file.originalname,
                uploadedBy: decoded.user._id,
                imageSize: req.file.size,
                imagePath: req.protocol + '://' + req.get('host') + '/images/uploaded/' + myTime + '-' + req.file.originalname
            });

            images.save(function(err, result) {
                if(err) {
                    return res.status(500).json({
                        title: 'An error occured. Images can\'t be saved!',
                        error: err        
                    });
                }
                // Save User
                user.uploadedImages.push(result);
                user.save();

                res.status(201).json({
                    image: 'Image(s) are saved!',
                    obj: result
                });
            });
        });
    });
});


/*====================================
    Get images from specific user
======================================*/
router.get('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    
    User.findById(req.params.id)
    .select('uploadedImages')
    .populate({
        path: 'uploadedImages',
        select: 'imagePath imageName newImageName'
    })
    .exec(function(err, result) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(result._id != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to get these images!',
                error: err
            })
        }
        res.status(200).json({
            message: 'Successful getting image...',
            obj: result
        });
    })
});



/*=============================
    Delete image
===============================*/
router.delete('/delete/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    Images.findById(req.params.id, function(err, image){
        if (err) {
            return res.status(500).json({
                title: 'An error occured - removing image...',
                error: err
            });
        }
        if(image.uploadedBy != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to delete this image!',
                error: err
            })
        }
        

        // Remove image  
        image.remove(function(err, result) {
            if (err) {
                return result.status(500).json({
                    title: 'An error occured during removing image...',
                    error: err
                });
            }
            
            fs.unlink(path.join(__dirname, '../public/images/uploaded/' + req.body.content), function(err){
                res.status(200).json({
                    image: 'Deleted image!',
                    obj: result
                });
            });
        });
    });
});


/*=============================
    Delete multiple images
===============================*/
router.delete('/delete', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    
    Images.remove({_id: {$in: req.body.content}}, function(err, result){
        if( err ){
            return result.status(500).json({
                title: 'Error during the multiple files (images) removing...',
                error: err
            });
        }
        
        User.findById(decoded.user._id, function(userError, userProfileImg) {
            for( var x = 0; x < req.body.content.length; x++ ) {
                fs.unlink(path.join(__dirname, '../public/images/uploaded/' + req.body.imageNames[x]));
                userProfileImg.uploadedImages.pull(req.body.content[x]);
            }
            userProfileImg.save();
        });        

        res.status(200).json({
            image: 'Deleted images!',
            obj: result
        });
    });
    
});



module.exports = router;