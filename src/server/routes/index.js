import indexHandler from './../handlers/index';
import Joi from 'joi';
import path from 'path';

module.exports = [
	{
		path: "/{path*}",
		method: "GET",
		config: {
			  auth: false 
		},
		handler: {
			file: indexHandler.getFile
		}
	} 
];