var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'folio',
	password: 'password'
});


console.log("[*] Database connection open");
connection.connect();

console.log("[*] Creating projects database");
connection.query("CREATE TABLE IF NOT EXISTS projects(id int AUTO_INCREMENT, name varchar(200), description varchar(2000), languages varchar(3000), url varchar(500), giturl varchar(500), PRIMARY KEY(id));");

console.log("[*] Creating users table");
connection.query("CREATE TABLE IF NOT EXISTS users(username varchar(200), passwordhash varchar(2000));");

console.log("[*] Creating default user, test@test.com (username), password (password)");
var passwordhash = bcrypt.hashSync("password", 8);
console.log("\t[>] Password hash: " + passwordhash);
connection.query("INSERT INTO users(username, passwordhash) values('test@test.com', '" + passwordhash + "');");

connection.end();
console.log("[*] Configuration finished... Database connection closed");
