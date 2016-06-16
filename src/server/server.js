require('env2')('./config/env.json'); 
const fs = require('fs');

var connection = {
	host: process.env.ServerHost || "localhost",
	port: process.env.ServerPort || 8080
	tls: {
		key: fs.readFileSync('./ssl/server.key'),
		cert: fs.readFileSync('./ssl/server.crt')
	}
};

require('./lib/startup.js')({
	connection: connection
});