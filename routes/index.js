module.exports = function(passport) {

	var express = require('express');
	var router = express.Router();
	var configConnection = require('../mysql/config');
	var config = {};
	configConnection.get(config);
	var user = require('../mysql/user');

	// Function to see if the user is logged in
	function isLoggedIn(req) {
		if( req.session.passport.user !== undefined ) {
			return true;
		}	

		return false;
	}

	router.get('/', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		res.render('index', { title: 'Home', loggedIn: loggedIn, config: config});
	});

	router.get('/projects', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects", function(err, rows) {
				res.render('projects', { title: 'Projects', loggedIn: loggedIn, projects: rows , config: config});
			});
		});

  		//res.render('index', { title: 'Projects', loggedIn: loggedIn });
	});

	router.get('/login', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/');
		}

		res.render('login', {title: "Login", config: config});
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

	router.get('/update/login', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/');
		}
		
		console.log(config);
		res.render('updatelogin', {title: 'Update Login', loggedIn: loggedIn, config: config});
	});

	router.post('/update/login', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/');
		}

		user.updateDetails(req.body);
		req.redirect('/');
		//res.render('updatelogin', {title: 'Update Login', loggedIn: loggedIn, config: config});
	});

	
	router.get('/projects/new', function(req, res) {
		
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/login');
		}

		res.render('newproject', { title: "Project", loggedIn: true, config: config});				
	});

	router.post('/projects/new', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/login');
		}
		
		var name = "";
		var desc = "";
		var weblocation = "";
		var sourcelocation = "";
		var thumbnail = "";

		// Get the thumbnail file name
		if (req.files["project_thumbnail"]) {
			thumbnail = req.files["project_thumbnail"].name;
		}
		
		// Collect all the data about the new project
		for( var l in req.body ) {
			if (l === "project_name") {
				name = req.body[l];
			} else if (l === "project_desc") {
				desc = req.body[l];
			} else if (l === "project_weblocation") {
				weblocation = req.body[l];
			} else if (l === "project_sourcelocation") {
				sourcelocation = req.body[l]
			} else {
				console.log("[E] Something strange happend!, Form name of '" + l + "'");
			}
		}

		req.getConnection(function(err, connection) {
			connection.query("INSERT INTO projects(name, description, weblocation, sourcelocation, thumbnail) values('" + name + "', '" + desc + "', '" + weblocation + "', '" + sourcelocation + "', '" + thumbnail + "');");
		});

		res.redirect('/projects');
	});

	router.get('/projects/edit/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);
		
		// If the user isnt logged in then they cant do this action
		if (!loggedIn) {
			res.redirect('/login');
		}
		
		// Get the ID of the project to edit
		var id = req.params.id;

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects WHERE id=" + id, function(err, rows) {
				res.render('editproject', {project: rows[0], loggedIn: loggedIn, config: config});	
			});	
		});
	});

	router.post('/projects/edit/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);
		
		// This action cant be done if the user isnt logged in
		if (!loggedIn) {
			res.redirect('/login');
		}

		var id = req.params.id;

		req.getConnection(function(err, connection) {
			for (var l in req.body) {
				if( req.body[l] != null && req.body[l] != "" ) {
					var field = l.split("_")[1];

					connection.query("UPDATE projects SET " + field + "='" + req.body[l] + "' WHERE id=" + id + ";", function(err, rows) { 
						if (err) {
							console.log("[ERROR] " + err);   
						}
					});
				}
			}
			
			if (req.files["project_thumbnail"]) {	
				connection.query("UPDATE projects SET thumbnail='" + req.files["project_thumbnail"].name + "' WHERE id=" + id);
			}

			res.redirect('/projects');
		});

	});

	router.get('/projects/delete/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			res.redirect('/login');
		}

		var id = req.params.id;

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects WHERE id=" + id, function(err, rows) {
				res.render('deleteproject', {project: rows[0], loggedIn: loggedIn, config: config});	
			});	
		});
	
	});

	router.get('/projects/destroy/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			res.redirect('/login');
		}

		var id = req.params.id;
		

		req.getConnection(function(err, connection) {
			connection.query("DELETE FROM projects WHERE id=" + id);
			res.redirect('/projects');
		});
	});

	router.get('/update', function(req, res) {
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			res.redirect('/login');
		}

		res.render('updateconfig', {loggedIn: loggedIn, config: config});

	});

	router.post('/update', function(req, res) {
		for (var i in config) {
			if (req.body[i]) {
				config[i] = req.body[i];
			}
		}
	
		for (var i in config) {
			if (req.files[i]) {
				config[i] = req.files[i].name;
			}
		}

		for (var i in config.experence) {
			config.experence[i].text = req.body["experence_" + config.experence[i].id];
		}
	
		configConnection.save(config);
		res.redirect('/');	
	});

	return router;
};
