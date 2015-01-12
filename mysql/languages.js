var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	database: 'folio',
	user: 'root',
	password: 'password'
});

connection.connect();

this.getLanguages = function(data) {
	//connection.connect();
	
	//var f;
	connection.query("SELECT * FROM languages", function(error, rows, fields) {
		var langs = [];

		for(var r in rows) {
			langs.push(rows[r].language);
		}

		data["languages"] = langs;
		console.log(data);
	});

	//connection.end();

	//return f();
};
