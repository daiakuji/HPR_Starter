//Load Modules
require ('env2')('./config/env.json'); 
import Hapi from 'hapi';
import path from 'path';
import P from 'bluebird';
import Vision from 'vision';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext} from 'react-router'
import routes from './../../common/routes'


// Export the server
module.exports = makeServer;

// Create the server
function makeServer() {
	
	return P.resolve().then(function(){
		var server = new Hapi.Server({});
		server.connection({
			host: process.env.ServerHost || "localhost",
			port: process.env.ServerPort || 8080
			});
		
		var plugins = require('./../adapters/plugins');
		
		return P.promisify(server.register, {context: server})(plugins).then(function() {
			server.route(require('./../routes/index'));
			server.ext('onPreResponse', (request, reply) => {
				//If the route exists and does not exist in the react-router
				if (typeof request.response.statusCode !== "undefined") {
					//Continue to the Hapi Route to server the file
					return reply.continue();
				}
				match({routes:routes, location:request.url},(err,redirect,props) => {
					//If the route does not exist, then it is a genuine 404
					if(err){
						reply(err.message).code(500)
						.continue();
						return;
					}
					 else if (redirect) {
						return reply.redirect(302, redirect.pathname + redirect.search)
					} else if (props) {
						  // You can also check renderProps.components or renderProps.routes for
						  // your "not found" component or route respectively, and send a 404 as
						  // below, if you're using a catch-all route.
						const appHtml = renderToString(<RouterContext {...props}/>)
					
						return reply(renderPage(appHtml)).code(200)
					} else {
						reply('Not found').code(404)
					}
				})
			});
		  }).then(function() {
			return P.promisify(server.start, {context: server})();
		  }).then(function() {
			return server;
		  });
		});		
}

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/style/index.css>
    <div id=app>${appHtml}</div>
    <script src="/js/client.js"></script>
   `
}