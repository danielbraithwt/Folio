var http = require('http'),
	db = require('./db'),
	app = require('./app')(db);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Folio server listening on port " + app.get('port'));
});
