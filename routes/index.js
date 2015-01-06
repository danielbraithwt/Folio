var express = require('express');
var router = express.Router();

var ProjectSchema = require("../schemas/project");

/* GET home page. */
router.get('/', function(req, res) {
	FlightSchema.find()
				.setOptions({sort: 'name'})
				.exec(function(error, projects) {
					if (error) {
						console.log(error);
						res.status(500).json({status: 'failure'});
					} else {
						res.render('index', { title: 'Projects', projects: projects });
					}
				});

  	res.render('index', { title: 'Express' });
});


module.exports = router;
