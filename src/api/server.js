require('env2')('./../../config/env.json'); 

var connection = {
	host: process.env.APIHost || "localhost",
	port: process.env.APIPort || 8080
};

require('./lib/startup.js')({connection: connection});