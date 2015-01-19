var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var connection = mysql.createConnection({
	host: process.env.FOLIO_HOST,
	user: process.env.FOLIO_USER,
	database: process.env.FOLIO_DATABASE,
	password: process.env.FOLIO_PASSWORD
});


console.log("[*] Database connection open");

console.log("[*] Creating projects database");
connection.query("CREATE TABLE IF NOT EXISTS projects(id int AUTO_INCREMENT, name varchar(200), description varchar(2000), weblocation varchar(500), sourcelocation varchar(500), thumbnail varchar(500), PRIMARY KEY(id));");

console.log("[*] Creating users table");
connection.query("CREATE TABLE IF NOT EXISTS users(username varchar(200), passwordhash varchar(2000));");
connection.query("TRUNCATE users;");

console.log("[*] Creating default user, admin (username), password (password)");
var passwordhash = bcrypt.hashSync("password", 10);
console.log("\t[>] Password hash: " + passwordhash);
connection.query("INSERT INTO users(username, passwordhash) values('admin', '" + passwordhash + "');");

console.log("[*] Creating config table");
connection.query("CREATE TABLE IF NOT EXISTS config(name varchar(400), description varchar(100), about_me varchar(400), resume varchar(200), profile_icon varchar(200), banner_image varchar(200), email varchar(200), github varchar(200), phone_number varchar(50));");
console.log("[*] Clearing config table");
connection.query("TRUNCATE config;");
console.log("[*] Creating empty record in config table");
connection.query("INSERT INTO config(name, description, about_me, resume, profile_icon, banner_image, email, github, phone_number) VALUES('', '', '', '', '', '', '', '', '')");

console.log("[*] Creating table to hold experence data")
connection.query("CREATE TABLE IF NOT EXISTS experence(id int AUTO_INCREMENT, title varchar(200), placeholder varchar(300), text varchar(2000), PRIMARY KEY(id));");
connection.query("TRUNCATE experence;");
connection.query("INSERT INTO experence(title, placeholder, text) values('Languages', 'What languages are you experenced with and how', '');");
connection.query("INSERT INTO experence(title, placeholder, text) values('Web Frameworks', 'What web frameworks are you experenced with and how', '');");


connection.end();
console.log("[*] Configuration finished... Database connection closed");
