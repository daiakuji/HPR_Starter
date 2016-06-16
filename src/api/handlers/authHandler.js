'use strict';
var JWT = require('jsonwebtoken'); 
var Crypto = require('crypto');

//var EXPIRATION = 14 * 24 * 60 * 60 * 1000; //Two Weeks
var EXPIRATION = 100; //For testing

//Create the cipher object
//var decipher = Crypto.createDecipher('sha256',process.env.JWT_SECRET) 
//Create the decipher object
//var cipher = Crypto.createCipher('sha256',process.env.JWT_SECRET)

var internals = {};

// Method Name: authUser
// Description: Function for third parties authentication handling
internals.authUser = function(request, reply) {
	// Third party authentication failed
	if (!request.auth.isAuthenticated) {
		return reply('Authentication failed due to: ' + request.auth.error.message);
	}
	else 
	{
		// Check if the user exists in the DB
		request.server.app.db.people.find({profileId: request.auth.credentials.profile.id}, function(err,res){
			// If the user doesn't exist
			if (res === null)
			{
				// Create the user with data from the provider
				var user = {
					provider: request.auth.credentials.provider	,
					profileId: request.auth.credentials.profile.id,
					name: request.auth.credentials.profile.displayName,
					email: request.auth.credentials.profile.email,
					firstName: request.auth.credentials.profile.name.first,
					lastName: request.auth.credentials.profile.name.last,
					password: 'Placeholder',
					isActive: true
				}
				// Save the user
				request.server.app.db.people.save(user, function(err,res){
					if (err)
						console.log(err);
					else
						return;
				});
			}
			// If the user exists but isn't active
			else if (res.length === 1 && !res[0].isActive)
			{
				//Reactivate the user by updating their flag. Alternatively, a new user could be created as well.
				request.server.app.db.people.save({id: res[0].id, isActive: true}, function(err,res){
					if (err)
						console.log(err);
					else
						return;
				});
			}
			else
			{
				console.log(res);
				//Handle a duplicate user.
			}
		});
	
		// Set variables for the  JWT
		var sid = request.auth.credentials.profile.id;
		var expire = Math.floor((new Date().getTime())/1000) + EXPIRATION 
	
		var session = {
			valid: true, // this will be set to false when the person logs out
			id: sid, // a random session id, To Do - Generate from Postgres or Redis
			exp: expire
		}
		// create the session in Redis
		//redisClient.set(session.id, JSON.stringify(session));
		// sign the session as a JWT
		var token = JWT.sign(session, process.env.JWT_SECRET); // synchronous

		var cookie_options = {
			ttl: null,				// TTL must be set to a numeric value. null expires on browser close
			encoding: 'none',		// we already used JWT to encode 
			isSecure: false,		// Defaults to false 
			isHttpOnly: true,		// prevent client alteration 
			clearInvalid: false,	// remove invalid cookies 
			strictHeader: false,		// don't allow violations of RFC 6265 
			path: '/',
			domain: 'localhost'
		}
		
		// Check the response from the provider
		//console.log(JSON.stringify(request.auth.credentials, null, 4));
		//reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>')
		
		reply()
	//	.header("Cookie", token)
		.state("token", token, cookie_options)
		.redirect("/restricted");
	}
}

// Method Name: authNonUser
// Description: Function for third parties to authenticate themselves or to generate a unique token for them to access the API
internals.authNonUser = function(request, reply) {
	//Validate the request.payload which should contain username and password
	var token = JWT.sign(session, process.env.JWT_SECRET); // synchronous

	var session = {
		valid: true, // this will be set to false when the person logs out
		id: sid, // a random session id, To Do - Generate from Postgres or Redis
		exp: expire
	}
	
	reply(token)
	.header("Authorization", token)
}

// Method Name: inactivateUser
// Description: Function to inactivate a user's profile 
internals.inactivateUser = function(request, reply) {
	// Check if the user exists in the DB
	request.server.app.db.people.find({id: request.payload.id, isActive: true}, function(err,res){
		if (res.length === 1)
		{
			//Inactivate User
			request.server.app.db.people.save({id: request.payload.id, isActive:false}, function(err,res){
				if(!err)
				{}
				else
				{}
			});
		}
		else
		{
			//The user doesn't exist or is already inactive
		
		}
	});
}

// Method Name: deleteUser
// Description: Function to remove a user's profile from the database
internals.deleteUser = function(request, reply) {
	request.server.app.db.people.destroy({id: request.payload.id}, function(err, res) {
		if(!err)
		{}
		else
		{}		
	});
}

// Method Name: logOutUser
// Description: Function to remove the session when the user has logged out
internals.logOutUser = function(request, reply) {
	//To remove the cookie, hapi unstates its
	reply({text: 'You have been logged out!'})
	.unstate("token");
}

module.exports = internals;