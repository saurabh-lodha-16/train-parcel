var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var session = require('express-session');
require('./config/passport-setup')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('req-flash');

const indexRouter = require('./routes/render/index');
const usersRouter = require('./routes/render/users');
const cityRouter = require('./routes/render/city');
const trainsRouter = require('./routes/render/train');
const statusRouter = require('./routes/render/status');
const loginRouter = require('./routes/render/users');
const roleRouter = require('./routes/render/role');
const officeRouter = require('./routes/render/office');
const trainStatusRouter = require('./routes/render/trainStatus');
const packageRouter = require('./routes/render/package');
const updateProfileRouter = require('./routes/render/profile')
const oAuthRouter = require('./routes/render/oAuth')
const userRoleRouter = require('./routes/render/userRole')
const apiCity = require('./routes/api/cities')
const apiTrain = require('./routes/api/trains')
const apiStatus = require('./routes/api/statuses')
const apiOffices = require('./routes/api/offices')

export const stripe = require("stripe")(stripeSecretKey);
import models from './models';
const app = express();

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(methodOverride('_method'))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
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
app.use(flash());

app.use(function (req, res, next) {
  res.locals.alert = req.flash('alert');
  res.locals.alertMsg = req.flash('alertMsg');
  next()
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cities', cityRouter);
app.use('/trains', trainsRouter);
app.use('/statuses', statusRouter);
app.use('/roles', roleRouter);
app.use('/user-roles', userRoleRouter)
//app.use('/unload', unloadRouter);
app.use('/trainStatuses', trainStatusRouter);
app.use('/packages', packageRouter);
app.use('/offices', officeRouter);
app.use('/profiles', updateProfileRouter);
app.use('/oauth', oAuthRouter);
app.use('/api/v1.0/cities', apiCity);
app.use('/api/v1.0/trains', apiTrain);
app.use('/api/v1.0/statuses', apiStatus);
app.use('/api/v1.0/offices', apiOffices);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//ye async karna hai
models.sequelize.sync();
// error handler
import { trainStatusCron } from './controllers/trainStatus/fillStations';
import { stripeKey, stripeSecretKey } from './config/payment';
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

