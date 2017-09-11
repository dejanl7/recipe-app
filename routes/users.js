var express     = require('express');
var router      = express.Router();
var bcrypt      = require('bcryptjs');
var jwt         = require('jsonwebtoken');
var sanitize    = require("mongo-sanitize");
var nodemailer  = require('nodemailer');
var random      = require('mongoose-random');

var User        = require('../models/users');
var roles       = require('../models/static-roles').allRoles;
var adminRole   = require('../models/static-roles').admin;
var creatorRole = require('../models/static-roles').creator;
var viewerRole  = require('../models/static-roles').viewer;
var _           = require('lodash');


/*================================
    Get all users (author widget)
==================================*/
router.get('/all-users', function(req, res, next){
    User.findRandom()
    .limit(8)
    .select('username profileImage userRecipes')
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting users profile information.'}
            });
        } 

        var usersWithRecipes = [];
        for ( var r=0; r<result.length; r++ ) {
            if ( result[r].userRecipes.length > 0 ) {
                usersWithRecipes.push(result[r]);
            }
        }
        

        res.status(200).json({
            title: 'Successful getting profile information...',
            obj: usersWithRecipes
        });
    });
});


/*=============================
    Get user info to check
    sign up email and username
===============================*/
router.get('/signin', function(req, res, next){
    User.find()
    .select('username email')
    .exec(function(err, result) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting user information.'}
            });
        }
        res.status(200).json({
            title: 'Successful getting data...',
            obj: result
        });
    });
});


/*==============================
    Add New User
================================*/
router.post('/', function (req, res, next) {
    var sanitizedRecords = sanitize(req.body);

    var user = new User({
        firstName: sanitizedRecords.name,
        lastName: sanitizedRecords.lastName,
        email: sanitizedRecords.email,
        username: sanitizedRecords.username,
        password: bcrypt.hashSync(sanitizedRecords.pwd, 10)
    });

    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Problem with registration...'}
            });
        }
        
        res.status(201).json({
            message: 'User created',
            obj: result
        });
        // Send email verification
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dejan.loncarfx@gmail.com',
                pass: '#'
            }
        });
        var mailOptions = {
            from: 'Dejan <dejan.loncarfx@gmail.com>',
            to: sanitizedRecords.email,
            subject: 'Account verification',
            text: 'Please click on this link to verify your account: http://localhost:3000/user-verification/' + result._id
        };
        transporter.sendMail(mailOptions, function(err, res) {
            if(err) {
                console.log('Error', err);
            }
                else {
                    console.log('Email Sent!', res);
                }
        });
    });
});


/*==============================
    E-mail user activation
================================*/
router.get('/:id', function(req, res, next){
    User.findById(req.params.id)
    .select('name lastName username email')
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Activation problem is occured. Please try to registrate again with valid username, e-mail and password.'}
            });
        }
        res.status(200).json({
            title: 'Successfull activation.',
            obj: result
        });
    });
});


/*==============================
    Activate user (email link)
================================*/
router.patch('/:id', function(req, res, next){
    User.findById(req.params.id, function(err, user) {
        if(err) {
            return res.status(500).json({
                title: 'Activation Error',
                error: {message: 'Invalid login credentials. User does not exist.'}
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'User does not exist.',
                error: {message: 'Please register through sign in form..'}
            });
        }

        user.userBlocked = false;
        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Users do not match criterium!'}
                });
            }

            // Save Message
            res.status(201).json({
                title: 'User is activated.',
                obj: result
            });
        });
    });
});


/*==============================
    Login User
================================*/
router.post('/login', function(req, res, next) {
    User.findOne({ username: req.body.username }, function(err, user){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Problem with logging user.'}
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials. User does not exist.'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials...'}
            });
        }
        if (user.userBlocked) {
            return res.status(401).json({
                title: 'Account verification is failed',
                error: {message: 'You did not activate your account. Please confirm e-mail verification.'}
            })
        }
        // Log In (create token)
        var token = jwt.sign({user: user}, 'secret');
        res.status(200).json({
            title: 'Successfully logged in...',
            token: token,
            userId: user._id
        });
    });
});


/*================================
    Get all emails (from users)
==================================*/
router.get('/account/emails', function(req, res, next){
    User.find()
    .select('email')
    .exec(function(err, result) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting all e-mails information.'}
            });
        }
        res.status(200).json({
            title: 'Successful getting email...',
            obj: result
        });
    })
});


/*=============================
    Protect Route
===============================*/
router.use('/account/', function(req, res, next) {
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


/*=============================
    Get User Info (by id)
===============================*/
router.get('/account/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    User.findById(req.params.id)
    .select('firstName lastName username email profileImage address dateUpdated userRole')
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting user data...'}
            });
        }
        if(result._id != decoded.user._id) {
            return res.status(401).json({
                title: 'Authority problem',
                error: {message: 'You don\'t  have role to get user information...'}
            })
        }

        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*================================
    Get Profile Image and email
==================================*/
router.get('/account/profile-image/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    User.findById(req.params.id)
    .select('profileImage email')
    .exec(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with getting profile image infromation.'}
            });
        }
        if(result._id != decoded.user._id) {
            return res.status(401).json({
                title: 'You don\'t have role to get user information!',
                error: {message: 'You must be registered if you want to approach to this route.'}
            })
        }
        res.status(200).json({
            title: 'Successfull getting data.',
            obj: result
        });
    });
});


/*=========================
    Update User Info
===========================*/
router.patch('/account/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    User.findById(req.params.id, function(err, user) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with updating user information...'}
            });
        }
        if(user._id != decoded.user._id) {
            return res.status(401).json({
                title: 'Authority problem',
                error: {message: 'You must be registered if you want to approach to this route.'}
            })
        }
        if(!user) {
            return res.status(500).json({
                title: 'No Users Found...',
                error: { message: 'User not found...' }
            });
        }

        
        // Sanitize records and save user info update
        sanitizedContent = sanitize(req.body);
        
        user.profileImage = sanitizedContent.editProfileImage || user.profileImage;
        user.firstName    = sanitizedContent.editFirstName || user.firstName;
        user.lastName     = sanitizedContent.editLastName || user.lastName;
        user.email        = sanitizedContent.editEmail || user.email;
        user.address      = sanitizedContent.editAddress || user.address;
        user.dateUpdated  = Date.now();
       

        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with saving user...'}
                });
            }
            res.status(201).json({
                title: 'Updated user.',
                obj: result
            });
        });
    });
});


/*=========================
    Grant Creator Role
===========================*/
router.patch('/account/grant-creator-role/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    User.findById(req.params.id, function(err, user) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: {message: 'Problem with updating user information...'}
            });
        }
        if(user._id != decoded.user._id) {
            return res.status(401).json({
                title: 'Authority problem',
                error: {message: 'You must be registered if you want to approach to this route.'}
            })
        }
        if(!user) {
            return res.status(500).json({
                title: 'No Users Found...',
                error: { message: 'User not found...' }
            });
        }
        
        user.userRole = {
            roleType: 'creator',
            roles: [
                { canManageRecipe: true },
                { canLeaveRating: true },
                { canBlockRecipeComments: true },
                { canBuy: true },
                { canMakeOrder: true },
                { canManageUsers: false },
                { canBlockUserComments: false }
            ]
        };
  
        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Problem with updating user roles...'}
                });
            }
            res.status(201).json({
                title: 'Updated user.',
                obj: result
            });
        });
    });
});


module.exports = router;
