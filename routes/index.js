module.exports = function(passport) {

	var express = require('express');
	var router = express.Router();

	var ProjectSchema = require("../schemas/project");

	/* GET home page. */
	router.get('/', function(req, res) {

		// See if the user is authencated
		var loggedIn = false;
		if( req.session.passport.user !== undefined ) {
			loggedIn = true;
		}

		ProjectSchema.find()
					.setOptions({sort: 'name'})
					.exec(function(error, projects) {
						if (error) {
							console.log(error);
							res.status(500).json({status: 'failure'});
						} else {
							res.render('index', { title: 'Projects', projects: projects, loggedIn: loggedIn});
						}
					});

  		res.render('index', { title: 'Projects' });
	});

	router.get('/login', function(req, res) {
		res.render('login', {title: "Login"});
	});

	router.post('/login', function(req, res) {
		passport.authenticate('local', {
			failureRedirect: '/login',
			successRedirect: '/'
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
