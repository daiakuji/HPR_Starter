'use strict';

var internals = {};

internals.getIndex = function (request, reply) {
	reply("Hello World");
}

internals.getUserList = function (request, reply) {	
	this.db.people.find({}, function (err,res) {
	 reply(res);	
	});
}

internals.getUser = function (request, reply) {
	this.db.people.find({id: request.params.id}, function(err,res){
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

module.exports = internals;