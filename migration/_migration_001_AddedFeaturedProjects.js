this.up = function(connection) {
	console.log("[*] Adding Fetured Projects Column");
	connection.query("ALTER TABLE projects ADD COLUMN fetured boolean DEFAULT false");

	connection.end();
}

this.down = function(connection) {
	console.log("[*] Removing Fetured Projects Colummn");
	connection.query("ALTER TABLE projects DROP COLUMN fetured");

	connection.end();
}
