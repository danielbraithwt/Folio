var Project = function() {
	this.data = {
		name: null,
		description: null,
		languages = [],
		url: null,
		git-url: null,
	};

	// Loads the information into then new project
	this.set = function(info) {
		for(var prop in this.data) {
			this.data[prop] = info[prop];
		}	

		// TODO: Save the new project to the database
	};

	// Returns the data object
	this.getAsList = function() {
		return this.data;
	};

	this.getLanguages = function() {
		return this.data["languages"];	
	};

};

module.exports = function(data) {
	var project = new Project();
	project.set(data);
	return project;
};
