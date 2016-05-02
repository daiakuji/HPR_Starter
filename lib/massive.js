//Load Modules
var massive = require("massive");
var config = require('config');

// Connection String: postgres://user:password@host/database
var connectionString = "postgres://"+config.get('DBServer.user')+":"+config.get('DBServer.password')+"@"+config.get('DBServer.host')+":"+config.get('DBServer.port')+"/"+config.get('DBServer.db');
var db = massive.connectSync({connectionString : connectionString});


exports.db = db;