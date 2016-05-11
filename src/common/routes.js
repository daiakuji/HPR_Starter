import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import App from './modules/App'
import About from './modules/About'
import Home from './modules/Home'
import Repos from './modules/Repos'
import Repo from './modules/Repo'

module.exports = (
{path: '/',
	component: App,
	indexRoute: {component: Home},
	childRoutes: [
		{path: 'about', component: About},
		{path: 'repos', component: Repos,
		childRoutes: [
			{path:'repo/:userName/:repoName', component:Repo}
		]}
		]}
)