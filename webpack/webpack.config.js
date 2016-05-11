'use strict';

const Path = require('path');
var webpack = require('webpack')

var config = {
	entry: 
	{
		client: Path.join(__dirname, './../src/client/client.js'),
	},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },	
	output: {
		filename: "[name].js",
		path: Path.join(__dirname, './../static/js'),
	},
	
	module: {
		loaders: [
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
			  presets: ['react', 'es2015']
			}
		  }
		],
	},

	plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
module.exports = config;