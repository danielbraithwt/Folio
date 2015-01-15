var mysql = require("mysql");
var connection = mysql.createConnection({
	host: 		process.env.FOLIO_HOST,
	database: 	process.env.FOLIO_DATABASE,
	user: 		process.env.FOLIO_USER,	
	password: 	process.env.FOLIO_PASSWORD
});

this.get = function(config) {
	connection.connect();

	connection.query("SELECT * FROM config", function(error, rows, fields) {
		if (error) {
			console.log(error);
		}

		for (var c in rows[0]) {
			config[c] = rows[0][c];
		}

		console.log("[*] Config Loaded");
	});

	connection.query("SELECT * FROM experence", function(error, rows, fields) {
		config["experence"] = rows;

		console.log(config);

		console.log("[*] Experence Loaded");
	});



	//connection.end();
};

this.save = function(config) {
	//connection.connect();
	
	console.log(config);

	for (var l in config) {
		if (l == "experence") {
			for (var e in config.experence) {
				console.log(config.experence[e]);
				connection.query("UPDATE experence SET text='" + ((config.experence[e].text != '' && config.experence[e].text) ? config.experence[e].text : '') + "' WHERE id=" + config.experence[e].id + ";", function(err, rows) {
					if (err) {
						console.log("[ERROR] " + err);
					}
				});
			}
		} else {
			connection.query("UPDATE config SET " + l + "='" + config[l] + "';", function(err, rows) { 
				if (err) {
					console.log("[ERROR] " + err);   
				}
			});
		}
	}
};
