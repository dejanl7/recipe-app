var express  = require('express');
var router   = express.Router();
var sanitize = require("mongo-sanitize");
var jwt      = require('jsonwebtoken');
var _        = require('lodash');

var Admin    = require('../models/admin');
var User     = require('../models/users');


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


/*=============================
    Protect Route
===============================*/
router.use('/manage', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated! Check out validation of your account.',
                error: {message: 'You must be registered if you want to approach to this route.'}
            });
        }
        next();
    })
});


/*===========================
    Update Widgets Position
=============================*/
router.patch('/manage/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    Admin.findOne( function (err, admin) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Getting admin info problem...'}
            });
        }

        User.findById(req.params.id)
        .select('userRole')
        .exec(function (userErr, userResult) {
            var canManageUsers = _.find(userResult.userRole.roles, { 'canManageUsers': true });
            
            if( !canManageUsers ) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'You are not authorized to manage admin content!'}
                });
            } 


            // Sanitize records and update admin info
            var sanitizedContent = sanitize(req.body);
            var jsonBody         = JSON.parse(sanitizedContent.body);

            admin.homePageLayout = jsonBody.homePageLayout || admin.homePageLayout;
            admin.widgets        = jsonBody.widgetPosition || admin.widgets;

            // Updated admin information
            admin.save(function(error, result){
                if(error){
                    return res.status(500).json({
                        title: 'An error occured',
                        error: {message: 'Problem with updating admin information...'}
                    });
                }
                res.status(201).json({
                    title: 'Updated admin.',
                    obj: result
                });
            });
        });      
    });
});
        


module.exports = router;