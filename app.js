var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

// mongoose.connect(process.env.DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })
//   .then(() => console.log('Connected!'))
//   .catch((error) => console.log(error.message))

mongoose.connect('mongodb+srv://dhameliyakrushil2023:RWi3AdQUquNeI4uB@travelplanning.ngkqnvm.mongodb.net/?retryWrites=true&w=majority&appName=TravelPlanning')
  .then(() => console.log('Connected!'))
  .catch((error) => console.log(error.message));

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var destinationRouter = require('./routes/destination');
var itineraryRouter = require('./routes/itinerary');
var activityRouter = require('./routes/activity');
var galleryRouter = require('./routes/gallery');
var bookingRouter = require('./routes/booking');
var feedbackRouter = require('./routes/feedback');
var paymentRouter = require('./routes/payment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/destination', destinationRouter);
app.use('/itinerary', itineraryRouter);
app.use('/activity', activityRouter);
app.use('/gallery', galleryRouter);
app.use('/booking', bookingRouter);
app.use('/feedback', feedbackRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
