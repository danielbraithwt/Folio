var express = require('express');
var router = express.Router();

var ProjectSchema = require("../schemas/project");

/* GET home page. */
router.get('/', function(req, res) {
	// TODO: should load all the projects from the database

  	res.render('index', { title: 'Express' });
});


module.exports = router;
