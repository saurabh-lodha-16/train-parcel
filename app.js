var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var session = require('express-session');
require('./config/passport-setup')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cityRouter = require('./routes/city');
const trainsRouter = require('./routes/train');
const statusRouter = require('./routes/status');
const loginRouter = require('./routes/users');
const roleRouter = require('./routes/role');
const officeRouter = require('./routes/office');
const trainStatusRouter = require('./routes/trainStatus');
const packageRouter = require('./routes/package');
const updateProfileRouter = require('./routes/profile')
const oAuthRouter = require('./routes/oAuth')
const userRoleRouter = require('./routes/userRole')


import models from './models';
const app = express();

app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
process.env.TZ = 'Asia/Kolkata';

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
app.use('/roles', roleRouter);
app.use('/userRole',userRoleRouter)
//app.use('/unload', unloadRouter);
app.use('/trainStatus', trainStatusRouter);
app.use('/package', packageRouter);
app.use('/office', officeRouter);
app.use('/updateProfile', updateProfileRouter);
app.use('/oAuth', oAuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//ye async karna hai
models.sequelize.sync();
// error handler
import { trainStatusCron } from './controllers/trainStatus/fillStations';
trainStatusCron();

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
