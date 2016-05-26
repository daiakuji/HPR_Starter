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
        path: '/restricted',
		method: 'GET', 
		handler: indexHandler.validateUser,
		config: { 
			auth: 'jwt' 
		}
	}
 ];