var indexHandler = require('./../handlers/index');
var Joi = require('joi');

module.exports = [
	{
		path: "/",
		method: "GET",
		handler: indexHandler.getIndex
	},
	{
		path: "/user",
		method: "GET",
		handler: indexHandler.getUserList,
		config: {
			// Include this API in swagger documentation
			tags: ['api'],
			description: 'Get whole user list',
			notes: 'Retrieves a whole list of users'
		}
	},
	{
		path: "/user/{id}",
		method: "GET",
		handler: indexHandler.getUser,
		config: {
			// Include this API in swagger documentation
			tags: ['api'],
			description: 'Get a user',
			notes: 'Retrieves a users based on the id'
		}		
	}
 ];