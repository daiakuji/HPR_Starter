import React from 'react'
import Links from './Links'
import Home from './Home'

export default React.createClass({
  render() {
    return (
		<div className="App">
			<div>
				<Links />
			</div>
			<div>Hello, React Router!</div>
			
			{ this.props.children || <Home/>}
			
		</div>
	)
  }
})