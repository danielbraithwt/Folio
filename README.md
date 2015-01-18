# Folio
Open source portfolio site for programmers, created with Node.js

## Setup
* Clone the github repo
* Set up environment variables
  * FOLIO_HOST - The host of the mysql datbase
  * FOLIO_DATABASE - The database name that should be used
  * FOLIO_USER - The username to login to the mysql database
  * FOLIO_PASSWORD - The password to login to the mysql database
* Run the database setup script `node setup/database.js`
* Start the server `node server.js`

The default login is `admin(username)`, `password(password)` when the site is first deployed it wont have anything to add conent login and to the edit config page, there you can customise the Folio website
