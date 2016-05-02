//Load Modules
var Hapi = require('hapi');
var path = require('path');
var P = require('bluebird');
var config = require('config');
var Vision = require('vision');

require('babel-core/register')({});

// Export the server
module.exports = makeServer;

var TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

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
			host: config.get('Server.host') || "localhost",
			port: config.get('Server.port') || 8080
			});
			
		server.stamp = require("./stamp")();
		
		//Configure http request cache
		return P.promisify(server.register, {context: server})(require('hapi-auth-cookie')).then(function() {
			var cache = server.cache({
				expiresIn: TWO_WEEKS,
				segment: '|sessions'
			});

			server.app.cache = cache;

			/*
			server.auth.strategy('session', 'cookie', 'required', {
				password: 'password-should-be-32-characters',
				appendNext: 'done',
				redirectTo: '/login',
				cookie: 'sid-example',
				clearInvalid: true,
				validateFunc: function(session, cb) {
					P.promisify(cache.get, {
						context: cache,
						multiArgs: true
					})(session.sid).catch(function(err) {
						cb(err, false);
					}).spread(function(item, cached) {
						if (!cached) {
						  cb(null, false);
						} else {
						  cb(null, true, item);
						}
					});
				}
			});*/
		}).then(function() {
			var plugins = require('./../adapters/plugins');
		
			return P.promisify(server.register, {context: server})(plugins).then(function() {
			server.register(Vision, (err) => {

				if (err) {
					console.log('Failed to load vision.');
				}

				server.views({
					engines: {
						jsx: require('hapi-react-views')
					},
					compileOptions: {}, // optional
					relativeTo: __dirname,
					path: 'views'
				});
			});

			server.route(require('./../routes/index'));
		  }).then(function() {
			return P.promisify(server.start, {context: server})();
		  }).then(function() {
			return server;
		  });
		});		
	});
}
