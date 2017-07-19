var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose'); // Working with MongoDB

// Routes
var appRoutes       = require('./routes/app');
var userRoutes      = require('./routes/users');
var recipeRoutes    = require('./routes/recipes');
var categoryRoutes  = require('./routes/categories');
// var commentRoutes   = require('./routes/comments');
// var ratingRoutes    = require('./routes/ratings');
// var imageRoutes     = require('./routes/images');

var app         = express();
mongoose.connect('localhost:27017/recipes'); // Connect to database 


/*===============================
    View Engine Setup
=================================*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Target Routes Middleware
app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/category', categoryRoutes);
// app.use('/comment', commentRoutes);
// app.use('/rating', ratingRoutes);
// app.use('/image', imageRoutes);
app.use('/', appRoutes);


/*===============================
  Catch 404 and forward to error 
  handler
=================================*/
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
