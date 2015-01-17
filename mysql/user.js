var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 		process.env.FOLIO_HOST,
	database: 	process.env.FOLIO_DATABASE,
	user: 		process.env.FOLIO_USER,
	password: 	process.env.FOLIO_PASSWORD
});

this.checkAuth = function(username, password, done) {
	// Find the user with the username passed to the function
	connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, rows, fields) {
					
		// If an error has occored then display and fail auth
		if (error) {
			console.log(error);
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
	connection.connect();

	for( var d in data ) {
		connection.query("UPDATE USERS SET " + d + " = '" + data[d] + "' LIMIT 1;");
	}

	connection.end();
};
