var mongoose = require('mongoose')

module.exports = mongoose.model("Project", {
	name: String,
	description: String,
	languages: [],
	url: String,
	giturl: String	
});
