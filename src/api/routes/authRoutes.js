//Add all the routes related to Auth Plugin here.
var Handler = require('./../handlers/authHandler');
var Joi = require('joi');

module.exports = [
	{
		path: "/auth/facebook",
		method: "GET",
		handler: Handler.authUser,   
		config: {
				auth: {
					strategy: 'facebook',
					mode: 'try'
				},
		}
	},  
	{
        method: '*',
        path: '/auth',
		handler: Handler.authNonUser,	
        config: {
            auth: false,
            cors: true,
			// Include this API in swagger documentation
			tags: ['api'],
			description: 'Validate a non social network user',
			notes: 'Validate a non social network user in the data base',
			validate: {
				payload: {
					name: Joi.string()
					.min(1)
					.required(),
					password: Joi.string()
					.min(1)
					.required()
				}
			}
		}
	},	
	{
		method: ['GET','POST'], 
		path: "/logout", 
		handler: Handler.logOutUser,
		config: { auth: false }
    }
];