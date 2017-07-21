var express      = require('express');
var router       = express.Router();
var bcrypt       = require('bcryptjs');
var jwt          = require('jsonwebtoken');
var sanitize     = require("mongo-sanitize");
var sanitizeHtml = require('sanitize-html');
var nodemailer   = require('nodemailer');

var User         = require('../models/users');


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
                error: err
            });
        }
        res.status(200).json({
            message: 'Successful getting data...',
            obj: result
        });
    });
});


/*==============================
    Add New User
================================*/
router.post('/', function (req, res, next) {
    var sanitizedRecords = sanitize(req.body);
    console.log(sanitizedRecords);

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
                error: err
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
                pass: '#your-password'
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
                title: 'An error occured - removing image...',
                error: err
            });
        }
        // Get Image according to id
        res.status(200).json({
            title: 'Successfull got image...',
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
                title: 'Error is occured during the activation user account...',
                error: err
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'User does not exist. Please register through sign in form...',
                error: err
            });
        }

        user.userBlocked = false;
        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: {message: 'Users do not match!'}
                });
            }

            // Save Message
            res.status(201).json({
                message: 'User is activated.',
                obj: result
            });
        });
        console.log(user);
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
                error: err
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
        // Log In (create token)
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in...',
            token: token,
            userId: user._id
        });
    });
});



module.exports = router;