//Load Modules
require('env2')('./config/env.json'); 
var Hapi = require('hapi');
var path = require('path');
var P = require('bluebird');
var Vision = require('vision');

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
			host: process.env.ServerHost || "localhost",
			port: process.env.ServerPort || 8080
			});
		
		server.stamp = require("./stamp")();
		
		//Configure http request cache
		return P.promisify(server.register, {context: server})([require('hapi-auth-jwt2'),require('bell')]).then(function() {
			/*var cache = server.cache({
				expiresIn: TWO_WEEKS,
				segment: '|sessions'
			});*/

			//Setup the JSON Web Token Authentication
			server.auth.strategy('jwt','jwt',true,
			{
				key:process.env.JWT_SECRET,
				validateFunc: require('./jwt2_validate_func'),
				verifyOptions: { 
					algorithms: [ 'HS256' ],
					ignoreExpiration:true 
					}
			});
			
			 //Setup the social Facebook login strategy
			server.auth.strategy('facebook', 'bell', {
				provider: 'facebook',
				password: process.env.JWT_SECRET, //Use something more secure in production
				// You'll need to go to https://developers.facebook.com/ and set up a
				// Website application to get started
				// Once you create your app, fill out Settings and set the App Domains
				// Under Settings >> Advanced, set the Valid OAuth redirect URIs to include http://<yourdomain.com>/bell/door
				// and enable Client OAuth Login
				clientId: process.env.ClientID,
				clientSecret: process.env.ClientSecret,
				isSecure: false, //Should be set to true (which is the default) in production
				location: server.info.uri
			});
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
					path: path.join(__dirname, '../views')
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
