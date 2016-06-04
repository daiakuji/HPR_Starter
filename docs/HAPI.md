# Hapi API Server
---

The main function of the API server is to act as the middleware between the front end application (mobile app, web app, third parties, etc) and the database. This is to ensure the scalability of the application in the future. 
It is possible to consolidate both server codes into one, as the server would manage the routes that the clients would call.

## Structure
---

In the (`src\api`) folder, the code is split into:

* Adapters
* Handlers
* Lib
* Routes

and the main server.js file.

### Adapters

The Adapters folder contains [plugins] (http://hapijs.com/tutorials/plugins) that are loaded when the hapi server is started. 

### Handlers

The Handlers folder contains the functions which are called when a client enters a route. Handlers functions can live within a route, and can be written as:

```
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello!');
    }
});
```

### Routes

The Routes folder contains the paths which clients can be directed to within the application. Routes can also contain a config parameter for authentication, validation or various other [options](http://hapijs.com/tutorials/routing#config):
```
config: {
	validate: {
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting'],	
		params: {
			name: Joi.string().min(3).max(10)
		},
		auth: 'simple',
		handler: function (request, reply) {
			reply('hello, ' + request.auth.credentials.name);
		}		
	}
}
```

### Libs

The Lib folder contains utility scripts which can be referenced in routes, server configuration, handlers, etc. 
In this project, the (`startup.js`) exports a function which configures the server connection, plugins and routes. It can also be used to [configure a views engine](http://hapijs.com/tutorials/views) as shown below for hapi-react-views:

```
server.register(Vision, (err) => {

	if (err) {
		console.log('Failed to load vision.');
	}

	server.views({
		engines: {
			jsx: require('hapi-react-views')
		},
		compileOptions: {}, // optional
		relativeTo: __dirname,
		path: path.join(__dirname, '../views')
	});
});
```

The startup script is typically the server.js script seen in the hapijs documentations and in various tutorials. The idea of modularising the code is if you wish to start other applications (metrics, monitoring, etc) along with the server. An example can be seen with [the npm site](https://github.com/npm/newww/blob/master/server.js)

## Starting a server
---
The basic requirements for a server to start up are:
```
var Hapi = require('hapi');
var server = new Hapi.Server();
server.start(function() {
	console.log('Server started at: ' + server.info.uri);
});
```
The next step would be the configuration of the server. With Hapi, this can be setting the connection details:
```
server.connection({
    port: 3000,
    host: '0.0.0.0'
})
```

registering plugins:
```
server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}
```

and setting the routes:
```
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello!');
    }
});
```

For further reading, see: [Hapi Server API documentation](http://hapijs.com/api#server)

## Massive
---
From the [documentation](http://massive-js.readthedocs.io/en/latest/):
>Massive is a PostgreSQL-specific data access tool. The goal of Massive is to make it easier for you to use PostgreSQL's amazing features, not to hide them under a load of abstraction.

One method to establish the database connection to be used with the routes, is to create a plugin and register the (`db`) variable in the context. To do this, we use (`server.bind()`) method before loading the routes to the server object. This can be found in the (`/adapters/db`) folder.

From there, the routes within the context can reference the (`db`) object by simply using (`this.db`). 

## DB Plugin
---
If you are not using Postgres or Massive, the connection string and required packagse can be modified in the (`src\api\adapters\db`) folder. The server bindings can be changed to whatever variable is required for the routes to access the database connection pool.

For example, if you are using MongoDB+Mongoose:
```
// single server
var uri = 'mongodb://localhost/test';
mongoose.createConnection(uri, { server: { poolSize: 4 }});

//Declare the models
var Cat = mongoose.model('Cat', { name: String });

server.bind({
		cat: Cat
	});
```

Then in your route handler:
```
//Hard coding. Kitty is the return object or successful response
Cat.create({ name: 'Zildjian' },function (err, kitty) {
  if (err) {
    console.log(err);
  } else {
    console.log(kitty);
  }
});
//Getting a parameter from the Route
Cat.create({ name: req.params.name});
//Or your front end creates a Cat payload, then you pass the JSON object in to be created
Cat.create(req.payload)
```

## Authentication
---
Authentication uses a combination of JWT and cookies. This project also utilises [bell](https://github.com/hapijs/bell) to authenticate users with existing social network profiles.

### JWT and cookies

The JSON Web Token is generated by encrypting a data object with a secret key. This can be stored against a user or a session, and can be used to set the scope or various other functions. While it is feasible to store a variety of information in the JWT, it is recommended to keep the information lean - as this is passed to the server on each request.

One method to handle the JSON Web Token would be to implement a function to store (e.g. localStorage) and pass the JWT via the client (e.g. React, Angular). The client would be configured to pass the Authentication/Authorization header and the server would validate it.

The method used in this project is to set the JWT in the cookie. The [hapi-aut-jwt2](https://github.com/dwyl/hapi-auth-jwt2) project has documentation and an example on how the JWT2 is set using Hapi with just
```
reply({text: 'You have been authenticated!'})
.state("token", token, cookie_options) // set the cookie with options
```

### Bell

Bell is a plugin that is easily configured with the third party authentication API to provide a basic profile and token for the user. From the [Bell documentation](https://github.com/hapijs/bell)
```
    // Declare an authentication strategy using the bell scheme
    // with the name of the provider, cookie encryption password,
    // and the OAuth client credentials.
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password_secure',
        clientId: 'my_twitter_client_id',
        clientSecret: 'my_twitter_client_secret',
        isSecure: false     // Terrible idea but required if not using HTTPS especially if developing locally
    });
```

Then set up a route for the users to log in via the client
```
   // Use the 'twitter' authentication strategy to protect the
    // endpoint handling the incoming authentication credentials.
    // This endpoints usually looks up the third party account in
    // the database and sets some application state (cookie) with
    // the local application account information.
    server.route({
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/login',          // The callback endpoint registered with the provider
        config: {
            auth: 'twitter',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                // Perform any account lookup or registration, setup local session,
                // and redirect to the application. The third-party credentials are
                // stored in request.auth.credentials. Any query parameters from
                // the initial request are passed back via request.auth.credentials.query.
                return reply.redirect('/home');
            }
        }
    });
```

In the case of this project, once the user is authenticated via the third party system, we create a JWT and set it to the cookie.

##Todo
* [x] Start up
* [x] Massive CRUD
* [x] Authentication
* [ ] Webpack