module.exports = function() {
	var bcrypt = require('bcryptjs');
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		database: 'folio',
		user: 'root',
		password: 'password'
	});

	functions = {};

	functions.checkAuth = function(username, password) {
		connection.connect();

		//connection.query("SELECT * FROM USERS WHERE username='" + username + "' AND passwordhash='" + passwordhash + ";", function(err, rows, fields) {
		connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, rows, fields) {
			if (bcrypt.compareSync(password, rows[0].passwordhash)) {
				return true;
			} else {
				return false;
			}

		});

		connection.end();
	}

	functions.updateDetails = function(data) {
		connection.connect();

		for( var d in data ) {
			connection.query("UPDATE USERS SET " + d + " = '" + data[d] + "' LIMIT 1;");
		}

		connection.end();
	}

	return functions;
 }
