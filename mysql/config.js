var mysql = require("mysql");
var mysqlConfig = require('./mysql-config');
var connection = mysql.createConnection(mysqlConfig);

this.get = function(config) {
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
		console.log("[*] Experence Loaded");
	});
};

this.save = function(config) {
	for (var l in config) {
		if (l == "experence") {
			for (var e in config.experence) {
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
