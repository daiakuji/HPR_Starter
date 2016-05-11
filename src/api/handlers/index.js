'use strict';

var dbConn = require('./../lib/massive.js');
var JWT = require('jsonwebtoken'); 

var internals = {};
var TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

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
          console.log(request.auth);
		  reply({text: 'You used a Token!'})
          .code(200)
          .header('Cache-Control', 'no-store')
          .header('Pragma', 'no-cache')
          //.header("Authorization", request.headers.authorization);		
}

internals.authUser = function(request, reply) {
        var session = {
          valid: true, // this will be set to false when the person logs out
          id: 1, // a random session id, To Do - Generate from Postgres or Redis
          exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
        }
        // create the session in Redis
        //redisClient.set(session.id, JSON.stringify(session));
        // sign the session as a JWT
        var token = JWT.sign(session, process.env.JWT_SECRET); // synchronous
        console.log(token);

        reply({token: token})
        .header("Authorization", token)
		//.state("token", token);
}

module.exports = internals;