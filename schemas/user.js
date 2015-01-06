var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
	email: String,
	passwordhash: String,
	name: String
});
