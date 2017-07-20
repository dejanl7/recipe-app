var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcryptjs');
var jwt     = require('jsonwebtoken');

var User    = require('../models/users');


/*=============================
    Get user info for Sign In
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
    var user = new User({
        firstName: 'User Name',
        lastName: 'User Last Name',
        email: 'user@email.com',
        username: 'user_n',
        password: bcrypt.hashSync('Forextrgovac', 10)
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
    });
});




module.exports = router;