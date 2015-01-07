var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	database: 'folio',
	user: 'root',
	password: 'password'
});

this.checkAuth = function(username, password) {
	connection.connect();

	//var auth = false;
	//connection.query("SELECT * FROM USERS WHERE username='" + username + "' AND passwordhash='" + passwordhash + ";", function(err, rows, fields) {
	connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, rows, fields) {
		//auth = true;

		if (bcrypt.compareSync(password, rows[0].passwordhash)) {
			return true;
			//console.log(auth);
		}

		return false;

	});

	connection.end();
	
	//return authA
	// TODO: Remove this when i can figure out how to get the auth
	// working properly;
	return true;
};

this.updateDetails = function(data) {
	connection.connect();

	for( var d in data ) {
		connection.query("UPDATE USERS SET " + d + " = '" + data[d] + "' LIMIT 1;");
	}

	connection.end();
};
