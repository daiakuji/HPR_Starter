import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'

// Set the store
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Set the reducer
import counterApp from './../common/modules/Count'

// Set the routes
import routes from './../common/routes'

const initialState = window.__INITIAL_STATE__

const store = createStore(counterApp, initialState)

render((
	<Provider store={store}>
	<Router routes={routes} history={browserHistory}/>
	</Provider>
), document.getElementById('app'))