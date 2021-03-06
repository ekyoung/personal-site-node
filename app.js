var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var tripRepository = require('./lib/trip-repository');

var routes = require('./routes/index');
var trips = require('./routes/trips');
var aboutThisSite = require('./routes/about-this-site');
var resume = require('./routes/resume');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/client-side', require('less-middleware')(path.join(__dirname, 'public')));
app.use('/client-side', express.static(path.join(__dirname, 'public')));


app.locals.trips = tripRepository.getAllTrips();

app.use('/', routes);
app.use('/trips', trips);
app.use('/about-this-site', aboutThisSite);
app.use('/resume', resume);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      titlePrefix: 'Uh Oh!',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    titlePrefix: 'Uh Oh!',
    message: err.message,
    error: {}
  });
});


module.exports = app;
