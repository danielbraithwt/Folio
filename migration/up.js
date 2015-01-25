var mysql = require('mysql');
var config = require('../mysql/mysql-config.js')
var connection = mysql.createConnection(config);

var _001 = require('./_migration_001_AddedFeaturedProjects.js');
_001.up(connection);
