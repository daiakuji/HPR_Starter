var indexHandler = require('./../handlers/dbHandler');
var Joi = require('joi');

module.exports = [
	{
		path: "/user",
		method: "GET",
		handler: indexHandler.getUserList,
		config: {
			//Dev Only
			//auth: 'jwt', 
			auth: false,
			cors: true,
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
			//Dev Only
			auth: false,
			cors: true,
			// Include this API in swagger documentation
			tags: ['api'],
			description: 'Get a user',
			notes: 'Retrieves a users based on the id',
			validate: {
				params: {
					id : Joi.number()
							.required()
							.description('the id for the todo item'),
				}
			}				
		}		
	},
	{
		path: "/modifyUser",
		method: ["PUT"],
		handler: indexHandler.modifyUser,
		config: {
			//Dev Only
			//auth: 'jwt', 
			auth: false,
			cors: true,
			// Include this API in swagger documentation
			tags: ['api'],
			description: 'Add or Modify a user',
			notes: 'Adds a new user or modifies an existing user',
			validate: {
				payload: {
					name: Joi.string()
					.min(1)
					.required(),
					email: Joi.string()
					.email(),
					password: Joi.string()
					.min(1)
					.required()
				}
			}			
		}
	}
];