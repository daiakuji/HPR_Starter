require('env2')('./../../config/env.json'); 
const fs = require('fs');

var connection = {
	host: process.env.APIHost || "localhost",
	port: process.env.APIPort || 8080,
    tls: {
		key: fs.readFileSync('./../../ssl/server.key'),
		cert: fs.readFileSync('./../../ssl/server.crt')
	}
};

require('./lib/startup.js')({
	connection: connection
});