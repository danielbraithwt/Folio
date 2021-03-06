var express = require('express');
var session = require('express-session');
var passport = require('./auth');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var routes = require('./routes/index')(passport);
var mysql = require('mysql');
var mysqlConfig = require('./mysql/mysql-config');
var MySQLStore = require('express-mysql-session');
var connection = require('express-myconnection');

var app = express();

// Configure multer
app.use(multer({ dest: './public/uploads/',
				onFileUploadStart: function (file) {
					console.log("[UPLOAD] Starting upload of: " + file.originalname);
				},
				onFileUploadComplete: function (file) {
					console.log("[UPLOAD] Upload finished: " + file.path);
				}
			}
		));

// view engine setup
app.set('port', process.env.FOLIO_PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Set the header
app.use( function (req, res, next) {
	res.set("X-Powered-By", "Folio");
	next();
});

//
app.use(connection(mysql, mysqlConfig, 'request'));
app.use(logger('dev'));	
app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	store: new MySQLStore(mysqlConfig),
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
	//var err = new Error('Not Found');
	//err.status = 404;
	//next(err);
	//
//	res.status(404);

//	res.locals.error_code = 404;
//	res.locals.error_message = "Not Found";
//	res.locals.error_desc = "The page you requested dosnt exsist";
//	res.render('error')
//	return;
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
    	res.status(err.status || 500);
    	res.render('error', {
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
	  	message: err.message,
       	error: {}
    });
});

module.exports = app;
