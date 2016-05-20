'use strict';

var dbConn = require('./../lib/massive.js');
var JWT = require('jsonwebtoken'); 

//var EXPIRATION = 14 * 24 * 60 * 60 * 1000; //Two Weeks
var EXPIRATION = 100; //For testing

var internals = {};

internals.getIndex = function (request, reply) {
	reply("Hello World");
}

internals.getUserList = function (request, reply) {
	dbConn.db.people.find({}, function (err,res) {
	 reply(res);	
	});
}

internals.getUser = function (request, reply) {
	dbConn.db.people.find({id: request.params.id}, function(err,res){
			reply(res);
	});
}

internals.validateUser = function(request, reply) {
	 reply({text: 'You used a Token!'})
	 .code(200)
	 .header('Cache-Control', 'no-store')
	 .header('Pragma', 'no-cache')
//	 .header("Authorization", request.headers.authorization)		
//	 .state("token", request.headers.authorization, {ttl: 365 * 30 * 7 * 24 * 60 * 60 * 1000})
}

internals.authUser = function(request, reply) {

	//if (!request.auth.isAuthenticated && request.path != '/auth') {
	//	return reply('Authentication failed due to: ' + request.auth.error.message);
	//}
	
	// Check if the user exists in the DB
	
	// If not create user with ID
	/*
	request.auth.credentials.provider	
	request.auth.credentials.profile.id
	request.auth.credentials.profile.displayName
	request.auth.credentials.profile.name.first
	request.auth.credentials.profile.name.last
	request.auth.credentials.profile.email
	*/
	if (request.auth.credentials)
	{
		var account = request.auth.credentials;
		var sid = account.profile.id;
	}
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

internals.logOutUser = function(request, reply) {
	// implement your own login/auth function here
	var decoded = JWT.decode(request.headers.authorization,
	  process.env.JWT_SECRET);
	//request.cookieAuth.clear();
	reply({text: 'You have been logged out!'})
	.unstate("token");
}

module.exports = internals;