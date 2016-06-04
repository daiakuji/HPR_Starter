//Load Modules
import Hapi from 'hapi';
import path from 'path';
import P from 'bluebird';
import Vision from 'vision';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext} from 'react-router'
import routes from './../../common/routes'

//Redux
import counterApp from './../../common/modules/Count'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// Export the server
module.exports = makeServer;

// Create the server
function makeServer(config) {
	
	return P.resolve().then(function(){
		var server = new Hapi.Server({});
		server.connection(config.connection);
		
		var plugins = require('./../adapters/plugins');
		
		return P.promisify(server.register, {context: server})(plugins).then(function() {
			server.route(require('./../routes/index'));
			server.ext('onPreResponse', (request, reply) => {
				//Create a new Redux store instance
				const store = createStore(counterApp)
				
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
						const appHtml = renderToString(
						<Provider store ={store}>
						<RouterContext {...props}/>
						</Provider>
						)
						
						console.log(store.getState());
						const initialState = store.getState()
					
						return reply(renderPage(appHtml, initialState)).code(200)
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

function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
	<head>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/style/index.css>
	</head>
	<body>
    <div id=app>${appHtml}</div>
	<script>
		window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
	</script>
    <script src="/js/client.js"></script>
	</body>
	</html>
   `
}