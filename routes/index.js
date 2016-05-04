var indexHandler = require('./../handlers/index');
var Joi = require('joi');


module.exports = [
	{
		path: "/",
		method: "GET",
		config: {
			  auth: false 
		},
		handler: indexHandler.getIndex
	},
   {
        method: '*',
        path: '/bell/door',
        config: {
            auth: {
                strategy: 'facebook',
                mode: 'try'
            },
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }
                reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
            }
        }
    },	
	{
		path: "/user",
		method: "GET",
		handler: indexHandler.getUserList,
		config: {
			//Dev Only
			auth: false, 

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
	}
 ];