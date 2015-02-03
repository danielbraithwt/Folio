// Get the mysql config from the environment
// variables and put them into an object
module.exports = {
	host: process.env.FOLIO_HOST || process.env.DB_HOST,
	database: process.env.FOLIO_DATABASE || process.env.DB_NAME,
	user: process.env.FOLIO_USER || process.env.DB_USER,
	password: process.env.FOLIO_PASSWORD || process.env.DB_PASS
}
