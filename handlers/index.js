'use strict';

var dbConn = require('./../lib/massive.js');

var internals = {};

internals.getIndex = function (request, reply) {
	reply("Hello world!");
}

internals.getUserList = function (request, reply) {
	dbConn.db.users.find({}, function (err,res) {
	 reply(res);	
	});
}

internals.getUser = function (request, reply) {
	dbConn.db.users.find({id: request.params.id}, function(err,res){
			reply(res);
	});
}
module.exports = internals;