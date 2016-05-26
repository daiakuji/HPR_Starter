'use strict';

var internals = {};

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

module.exports = internals;