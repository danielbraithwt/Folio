// Get the mysql config from the environment
// variables and put them into an object
module.exports = {
	host: process.env.FOLIO_HOST,
	database: process.env.FOLIO_DATABASE,
	user: process.env.FOLIO_USER,
	password: process.env.FOLIO_PASSWORD
}
