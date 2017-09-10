var express  = require('express');
var router   = express.Router();
var sanitize = require("mongo-sanitize");
var jwt      = require('jsonwebtoken');
var _        = require('lodash');

var Admin    = require('../models/admin');


/*==========================
    Initial Admin
============================*/
router.post('/', function (req, res, next) {

    var admin = new Admin();
    
    admin.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Problem with admin initialization...'}
            });
        }
        
        
        res.status(201).json({
            message: 'Admin created',
            obj: result
        });
    });
});


/*=========================
    Get Admin Info
===========================*/
router.get('/', function (req, res, next) {
    Admin.find()
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Getting admin info problem...'}
            });
        }

        res.status(200).json({
            title: 'Successfull getting admin info.',
            obj: result
        });
    });
});


/*=========================
    Update Layouts
===========================*/
router.patch('/layout', function(req, res, next){

    Admin.findById(req.params.id, function(err, admin) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with updating widgets and layout information...'}
            });
        }
        
        // Sanitize records and save admin info update
        sanitizedContent = sanitize(req.body);
        
       
       

       /* admin.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with updating admin...'}
                });
            }
            res.status(201).json({
                title: 'Updated admin.',
                obj: result
            });
        }); */
    });
});


module.exports = router;