module.exports = function(passport) {

	var express = require('express');
	var router = express.Router();
	var languages = require('../mysql/languages');
	//console.log(list_lang);

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

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects", function(err, rows) {
				console.log(rows);
				res.render('index', { title: 'Projects', loggedIn: loggedIn, projects: rows });
			});
		});

  		//res.render('index', { title: 'Projects', loggedIn: loggedIn });
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
	
	router.get('/project/new', function(req, res) {
		
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/login');
		}

		req.getConnection(function(err, connection) {
			
			connection.query("SELECT * FROM languages", function(err, rows) {
				var langs = {};

				for(var r in rows) {
					langs[rows[r].id] = rows[r].language;
				}

				res.render('newproject', { title: "Project", loggedIn: true, languages: langs });				
			});
		});
	});

	router.post('/project/new', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/login');
		}
		
		var name = "";
		var desc = "";
		var languages = [];

		for( var l in req.body ) {
			if (l === "project_name") {
				name = req.body[l];
			} else if (l === "project_desc") {
				desc = req.body[l];
			} else if (l.indexOf("language") != -1) {
				var lang = l.split("_")[1];
				languages.push(lang);
			} else {
				console.log("[E] Something strange happend!, Form name of '" + l + "'");
			}
		}

		console.log("[*] New Project!");
		console.log("[*] Name: " + name);
		console.log("[*] Description: " + desc);
		console.log("[*] Languages: " + languages);

		req.getConnection(function(err, connection) {
			connection.query("INSERT INTO projects(name, description, languages) values('" + name + "', '" + desc + "', '" + languages.join() + "');");
		});

		res.redirect('/');
	});

	return router;
};
