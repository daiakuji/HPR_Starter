'use strict';
var path = require('path');
var internals = {};

//handle static file requests
internals.getFile = function (request, reply) {
	return 'static'+request.path;
}

module.exports = internals;