//Load Modules
var massive = require("massive");

// Connection String: postgres://user:password@host/database
var connectionString = "postgres://"+process.env.DBuser+":"+process.env.DBpassword+"@"+process.env.DBhost+":"+process.env.DBport+"/"+process.env.DB;

var db = massive.connectSync({connectionString : connectionString});


exports.db = db;