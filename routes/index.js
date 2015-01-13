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

		res.render('index', { title: 'Home', loggedIn: loggedIn});
	});

	router.get('/projects', function(req, res) {
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects", function(err, rows) {
				console.log(rows);
				res.render('projects', { title: 'Projects', loggedIn: loggedIn, projects: rows });
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
	
	router.get('/projects/new', function(req, res) {
		
		// See if the user is authencated
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			// TODO: Set a message to eb displayed 
			req.redirect('/login');
		}

		req.getConnection(function(err, connection) {
			
			connection.query("SELECT * FROM languages", function(err, rows) {
				res.render('newproject', { title: "Project", loggedIn: true});				
			});
		});
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
			connection.query("INSERT INTO projects(name, description, weblocation, sourcelocation) values('" + name + "', '" + desc + "', '" + weblocation + "', '" + sourcelocation + "');");
		});

		res.redirect('/projects');
	});

	router.get('/projects/edit/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			res.redirect('/login');
		}

		var id = req.params.id;

		req.getConnection(function(err, connection) {
			connection.query("SELECT * FROM projects WHERE id=" + id, function(err, rows) {
				res.render('editproject', {project: rows[0], loggedIn: loggedIn});	
			});	
		});
	});

	router.post('/projects/edit/:id', function(req, res) {
		var loggedIn = isLoggedIn(req);

		if (!loggedIn) {
			res.redirect('/login');
		}

		var id = req.params.id;

		req.getConnection(function(err, connection) {
			for (var l in req.body) {
				console.log("Setting " + l + " : " + req.body[l]);

				if( req.body[l] != null && req.body[l] != "" ) {
					var field = l.split("_")[1];

					connection.query("UPDATE projects SET " + field + "='" + req.body[l] + "' WHERE id=" + id + ";", function(err, rows) { 
						if (err) {
							console.log("[ERROR] " + err);   
						} else {
							console.log("[UPDATE] Project(id=" + id + "): " + field + " updated to " + req.body[l]);
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
				res.render('deleteproject', {project: rows[0], loggedIn: loggedIn});	
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

	return router;
};
