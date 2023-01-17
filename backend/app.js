var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');
var playersRouter = require('./routes/Player');
var multiRouter = require('./routes/multi');
var scoreRouter = require('./routes/score');
const authMiddl = require('./middelwares/auth')
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connection to MongoDB.
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://user:aXrVVUqnLbKkBcN8@cluster0.qkbvo.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => console.log("Error", err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/players', playersRouter);
app.use('/multiplicateur', multiRouter);
app.use('/score', scoreRouter);

app.use(authMiddl);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
