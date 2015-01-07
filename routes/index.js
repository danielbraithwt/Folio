module.exports = function(passport) {

	var express = require('express');
	var router = express.Router();

	function isLoggedIn(req) {
		if( req.session.passport.user !== undefined ) {
			return true;
		}	

		return false;
	}

	/* GET home page. */
	router.get('/', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

  		res.render('index', { title: 'Projects', loggedIn: loggedIn });
	});

	router.get('/resume', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		res.render('resume', {title: "Resume", loggedIn: loggedIn});
	});

	router.get('/login', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/');
		}

		res.render('login', {title: "Login"});
	});

	router.post('/login', passport.authenticate('local', {
			failureRedirect: '/login',
			successRedirect: '/'
		})
	);

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
