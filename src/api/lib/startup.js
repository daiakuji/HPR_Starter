//Load Modules
require('env2')('./../../config/env.json'); 
var Hapi = require('hapi');
var path = require('path');
var P = require('bluebird');


// Export the server
module.exports = makeServer;

// Create the server
function makeServer() {
	
	return P.resolve().then(function(){
		var server = new Hapi.Server({
			// Future implementation for redis
			//cache
			//connections
			//router
			//routes
		});
		server.connection({
			host: process.env.APIHost || "localhost",
			port: process.env.APIPort || 8080
			});
		
		server.stamp = require("./stamp")();
		
		var plugins = require('./../adapters/plugins');
				
		return P.promisify(server.register, {context: server})(plugins).then(function() {		
			server.route(require('./../routes/index'));
			server.ext('onPreResponse', (request, reply) => {
				return reply.continue();
			});
		  }).then(function() {
			return P.promisify(server.start, {context: server})();
		  }).then(function() {
			return server;
		  });
		});		
}
