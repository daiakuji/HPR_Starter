import React from 'react'
import NavLink from './NavLink'
import IndexLink from 'react-router/lib/IndexLink'

export default React.createClass({
  render() {
    return (
		<div>
			<h1>React Router Tutorial</h1>
			<ul role="nav">
				<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
				<li><NavLink to="/about">About</NavLink></li>
				<li><NavLink to="/Repos">Repos</NavLink></li>
				<li><NavLink to="/Counter">Counter</NavLink></li>
			</ul>
		</div>
	)
  }
})