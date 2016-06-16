//Load Modules
var Hapi = require('hapi');
var path = require('path');
var P = require('bluebird');


// Export the server
module.exports = makeServer;

// Create the server
function makeServer(config) {
	
	return P.resolve().then(function(){
		var server = new Hapi.Server(
			// Future implementation for redis
			//cache
			//connections
			//router
			//routes
		);
server.connection(config.connection);

//	server.connection(config.connection,config.tls)
		server.stamp = require("./stamp")();
		
		var plugins = require('./../adapters/plugins');
				
		return P.promisify(server.register, {context: server})(plugins).then(function() {		
			server.route(require('./../routes/index'));
			server.ext('onPreResponse', (request, reply) => {
				return reply.continue();
			});
		  }).then(function() {
			return P.promisify(server.start, {context: server})(()=>{
		console.log(server.info	);
				//console.info(`Server started at ${ server.info.uri }`);	
			});
		  }).then(function() {
			return server;
		  });
		});		
}
