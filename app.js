var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cityRouter = require('./routes/city');
const trainsRouter = require('./routes/train');
const statusRouter = require('./routes/status');
const loginRouter = require('./routes/users');
const roleRouter = require('./routes/role');
//const unloadRouter = require('./routes/unload');
const trainStatusRouter = require('./routes/trainStatus');
const packageRouter = require('./routes/package');


import models from './models';
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: 'user_sid',
  secret: 'testsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 6000000
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/city', cityRouter);
app.use('/train', trainsRouter);
app.use('/status', statusRouter);
app.use('/role', roleRouter);
//app.use('/unload', unloadRouter);
app.use('/trainStatus', trainStatusRouter);
app.use('/package',packageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//ye async karna hai
models.sequelize.sync();
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
