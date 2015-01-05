var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project');

module.exports = mongoose.connection;
