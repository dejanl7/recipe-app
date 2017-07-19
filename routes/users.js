var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcryptjs');
var jwt     = require('jsonwebtoken');

var User    = require('../models/users');


/*==============================
    Add New User
================================*/
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: 'Dejan',
        lastName: 'Loncar',
        email: 'dejan.loncarfx@gmail.com',
        username: 'dejanfx',
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