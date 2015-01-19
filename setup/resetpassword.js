var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var connection = mysql.createConnection({
	host: process.env.FOLIO_HOST,
	user: process.env.FOLIO_USER,
	database: process.env.FOLIO_DATABASE,
	password: process.env.FOLIO_PASSWORD
});

console.log("[*] Database connection open")

console.log("[*] Resetting username and password");
connection.query("TRUNCATE users;");
console.log("[*] Creating default user, admin (username), password (password)");
var passwordhash = bcrypt.hashSync("password", 10);
console.log("\t[>] Password hash: " + passwordhash);
connection.query("INSERT INTO users(username, passwordhash) values('admin', '" + passwordhash + "');");

connection.end();
console.log("[*] Finished!");


