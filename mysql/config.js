var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 'localhost',
	database: 'folio',
	user: 'root',	
	password: 'password'
});


this.get = function(config) {
	connection.connect();

	connection.query("SELECT * FROM config", function(error, rows, fields) {
		for (var c in rows[0]) {
			config[c] = rows[0][c];
		}

		console.log("[*] Config Loaded");
	});

	//connection.end();
};

this.save = function(config) {
	//connection.connect();
	
	console.log(config);

	for (var l in config) {
		connection.query("UPDATE config SET " + l + "='" + config[l] + "';", function(err, rows) { 
		if (err) {
			console.log("[ERROR] " + err);   
		}
	});

	//connection.end();
}
};
