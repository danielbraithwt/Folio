module.exports = function() {
	var mysql = require('mysql'),
	project = require('./project'),
	connection = mysql.createConnection({
		host: 'localhost',
		database: 'folio',
		user: 'root',
		password: 'password'
	});

	functions = {};

	functions.getProject = function(id) {
		connection.connect();

		connection.query("SELECT * FROM project WHERE id=" + id, function(error, rows, fields) {
			return new project(rows[0]);				
		});

		connection.end();
	};

	functions.createProject = function(project) {
		var i = 0;
		var tableNames = "";
		var values = "";

		for( var v in project.getAsList() ) {
			if( v === "id" ) {
				continue;
			}

			tableNames += v;
			values += "'" + project.getAsList()[v] + "'"

			if( v === 1 ) {
				tableNames += ",";
				values += ",";
			}
		}

		var query = "INSERT INTO project(" + tableNames + ") values(" + values + ");";
		connection.query(query, function(error, rows, fields) {
			if (error) {
				console.log("Error creating project: " + error);
				return false;
			} else {
				console.log("Project created: " + query);				
				return true;
			}
		});
	};

	return functions;
}

	
