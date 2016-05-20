import React, { Component, PropTypes } from 'react'

class Counter extends Component {
	render() {
		const { increment, incrementIfOdd, incrementAsync, decrement, counterValue } = this.props
		return (
			<div>
				<p>
					Clicked: {counterValue} times
					{' '}
					<button onClick={increment}>+</button>
					{' '}
					<button onClick={decrement}>-</button>
					{' '}
					<button onClick={incrementIfOdd}>Increment if odd</button>
					{' '}
					<button onClick={() => incrementAsync()}>Increment async</button>	
				</p>
				{this.props.children}
			</div>	
		)
	}
}

Counter.propTypes = {
	increment: PropTypes.func.isRequired,
	incrementIfOdd: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	counterValue: PropTypes.number
}

export default Counter