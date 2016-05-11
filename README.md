# Framework for a Hapi server, React front end and Postgres/Massive database application
---

## About
This is a starter boilerplate app which uses the following technologies:

* [Hapi](http://hapijs.com/)
* [Postgres](http://www.postgresql.org/) for data storage
* [Massive](https://massive-js.readthedocs.io) for data access
* [Hapi-auth-JWT2](https://github.com/dwyl/hapi-auth-jwt2) and [more JWT information](https://github.com/dwyl/learn-json-web-tokens) for token authentication
* [bell](https://github.com/hapijs/bell) for Social Network authentication
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run start-prod
```

## Project
### Structure

```
.
├── .babelrc                                    * Babel API configuration file
├── package.json								* Install dependencies, build and run scripts
├── bin/										* Webpack output for server code
├── config/										* Application configuration file
├──	node_modules/								* Default NPM module installation path
├── src/										* Source code
|	└── api/									* Hapi API server source code
|	|	└── adapters/							* Hapi plugins
|	|	└── handlers/							* Hapi Router Handlers
|	|	└── lib/								* Utility scripts for the server
|	|	└── routes/								* Hapi Router
|	└── client/									* React client
|	└── common/									* Common javascript files used for server and client (react)
|	|	└── components/
|	|	└── containers/
|	|	└── redux/	
|	|	└── routes.js							* React routing	
|	└── server/									* Hapi Server source code for Server Side Rendering
|		└── adapters/							* Hapi plugins
|		└── handlers/							* Hapi Route Handlers for serving static file requests
|		└── lib/								* Utility scritps for the server
|		└── routes/								* Hapi Router to handle static files	
├── static/										* Static files for hosting. Public/Assets can also be used
|	└── js/										* Webpack output for client.js
└── webpack/									* Webpack configuration files
```

## Hapi Server
There are two servers in this package - one for the API calls to the database (`src/api`) and the other to perform server rendering for the initial load (`src/server`). Both servers have been written with the Hapi Framework.
To start using hapi, simply import or require the hapi package into your script.
```
npm i --S hapi
```
```js
var Hapi = require('hapi');
```

See [Hapi Server Side Rendering](/docs/HapiSSR.md) for more details on server side rendering.
See [Hapi API](/docs/HAPI.md) for more details on the API.


## React Client
The react client (`src/client`) has been written in ES6. The client module is compiled into single js with a bundler (webpack) and placed in the static folder for both the server and client to access.

See [React Client](/docs/ReactClient.md) for more details.

## React Routing
See the [React Router tutorial](https://github.com/reactjs/react-router-tutorial) for 14 lessons on how to use react-router with react.

##Todo
* [ ] Redux implementation
* [ ] Redis session management
* [ ] API Authentication scheme
* [ ] React/Bootstrap components
* [ ] Testing modules
* [ ] Documentation