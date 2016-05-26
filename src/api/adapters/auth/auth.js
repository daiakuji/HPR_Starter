var routes = require('./../../routes/authRoutes');
//var EXPIRATION = 14 * 24 * 60 * 60 * 1000; //Two Weeks
var EXPIRATION = 100; //For testing

exports.register = function(server, options, next) {
			var cache = server.cache({
				expiresIn: EXPIRATION,
				segment: '|sessions'
			});
			
			//Setup the JSON Web Token Authentication
			server.auth.strategy('jwt','jwt',true,
			{
				key:process.env.JWT_SECRET,
				validateFunc: require('./../../lib/jwt2_validate_func'),
				verifyOptions: { 
					algorithms: [ 'HS256' ],
					ignoreExpiration:true 
					},
				cookieKey: 'token'
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
			});
			server.route(routes);
			next();
		}

exports.register.attributes = {
    pkg: require("./package.json")
};		
