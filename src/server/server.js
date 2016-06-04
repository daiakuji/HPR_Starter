require('env2')('./config/env.json'); 

var connection = {
	host: process.env.ServerHost || "localhost",
	port: process.env.ServerPort || 8080
};
require('./lib/startup.js')({connection: connection});