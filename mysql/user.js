var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var mysqlConfig = require('./mysql-config');
var connection = mysql.createConnection(mysqlConfig);

this.checkAuth = function(username, password, done) {
	// Find the user with the username passed to the function
	connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, rows, fields) {
					
		// If an error has occored then display and fail auth
		if (error) {
			console.log(error);
			return done(null, false);
		}

		if (rows[0] === undefined) {
			return done(null, false);
		}
					
		// Check to see if the password entered matches the one stored
		if (bcrypt.compareSync(password, rows[0].passwordhash)) {
			return done(null, {username: username});
		}
		
		return done(null, false);
	});
}

this.updateDetails = function(data) {
	// Update the user table with the data provided
	if (data.username) {
		connection.query("UPDATE users SET username='" + data.username + "';");	
	}

	if (data.password) {
		var passwordHash = bcrypt.hashSync(data.password, 10);
		connection.query("UPDATE users SET passwordhash='" + passwordHash + "';");	
	}
};
