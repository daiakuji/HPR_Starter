//Actions
export const SET_COUNTER = 'SET_COUNTER' 
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function set(value) {
	return {
		type: SET_COUNTER,
		payload: value
	}
}

export function increment() {
	return {
		type: INCREMENT_COUNTER
	}
}

export function decrement() {
	return {
		type: DECREMENT_COUNTER
	}
}

export function incrementIfOdd() {
	return (dispatch, getState) => {
		const { counterValue } = getState()
		
		if (counterValue%2===0){
			return
		}
		
		dispatch(increment())
	}
}

export function incrementAsync(delay = 1000) {
	return  dispatch => {
		setTimeout(()=> {
			dispatch(increment())
		},delay)
	}
}

// Reducer
export default function counter(state = 0, action) {
	switch(action.type) {
		case SET_COUNTER:
			return action.payload
		case INCREMENT_COUNTER:
			return state + 1
		case DECREMENT_COUNTER:
			return state - 1
		default:
			return state
	}
}