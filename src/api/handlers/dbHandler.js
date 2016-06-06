'use strict';

var internals = {};

internals.getUserList = function (request, reply) {	
	request.server.app.db.people.find({}, function (err,res) {
		reply(res)
		.header('Access-Control-Allow-Origin: *');	
	});
}

internals.getUser = function (request, reply) {
	request.server.app.db.people.find({id: request.params.id}, function(err,res){
		reply(res);
	});
}

internals.modifyUser = function (request, reply) {
	request.server.app.db.people.save(request.payload, function(err,res){
		reply(res)
		.header('Access-Control-Allow-Origin: *');	
	});
}

module.exports = internals;