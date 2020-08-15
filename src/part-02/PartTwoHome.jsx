import React from 'react';
import { createStore } from 'redux';

//type

const GENERATE_RANDOM = 'GENERATE_RANDOM';
const ADD_COUNT = 'ADD_COUNT';
const MAX_RANDOM = 'MAX_RANDOM'

// function

function get_Random(number) {
	return Math.floor(Math.random() * number)
};

// инициализация state

const initState = {
	random: 55,
	count: 0,
	max_random: null
}

// reducer

const reducer = (state = initState, action) => {
	console.log(state, action);

	const { type } = action;

	switch (type) {
		case GENERATE_RANDOM: 
			return {
				...state, random: get_Random(state.max_random)
			};
	
		case ADD_COUNT: 
			return {
				...state, count: state.count + 1
			};
		case MAX_RANDOM: 
			const { max_random } = action;
			return {
				...state, max_random
			};
	}
	return state;
}

// store

const store = createStore(reducer);

class PartTwoHome extends React.Component {

	generateRandom = () => {
		const action = { type: GENERATE_RANDOM, max_random: 500};
		store.dispatch(action);
		this.forceUpdate()
	}

	addCount = () => {
		const action = { type: ADD_COUNT};
		store.dispatch(action);
		this.forceUpdate()
	}

	getNewNumber = (e) => {
		const action = { type: MAX_RANDOM, max_random: e.target.value}
		store.dispatch(action);
		this.forceUpdate()
	}

	render() {
		const state = store.getState();
		const stateStr = JSON.stringify(state, null, ' ');
		console.log(state)
		return (
			<div>
				<div>{stateStr}</div>
				<button onClick={this.generateRandom}>Сгенерировать число</button>
				<button onClick={this.addCount}>Увеличить количество</button>
				<div style={{ margin: '10px 10px'}}>
					<input placeholder="Max random number" onChange={this.getNewNumber} />
				</div>
			</div>
		)
	}
}

export default PartTwoHome;