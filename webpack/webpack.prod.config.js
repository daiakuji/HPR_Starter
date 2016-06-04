'use strict';

const Path = require('path');

var config = {
	context: __dirname + "/app",
	entry: 
	{
		api: Path.join(__dirname, './src/api/server.js'),
		client: Path.join(__dirname, './src/client/client.js'),
		server: Path.join(__dirname, './src/server/server.js')		
	},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },	
	output: {
		filename: "[name].js",
		path: Path.join(__dirname, './bin'),
	},
	
	module: {
		loaders: [
		  {
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
			  presets: ['react', 'es2015']
			}
		  }
		],
	}	
};
module.exports = config;