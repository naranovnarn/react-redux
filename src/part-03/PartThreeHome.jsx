import React from 'react';
import { createStore } from 'redux';
import * as types from './types';

function get_random(number) {
    return Math.floor(Math.random() * number);
}

const initState = {
    random: 55,
    count: 0,
    random_word: ''
};

const reducer = (state = initState, action) => {
    console.log(state, action)
    const { type, payload } = action;

    switch(type) {
        case types.GENERATE_RANDOM: return GENERATE_RANDOM(state, payload);
        case types.ADD_COUNT: return ADD_COUNT(state, payload);
        case types.RANDOM_WORD: return RANDOM_WORD(state, payload)
        default: return state;
    }
}


const store = createStore(reducer);

function GENERATE_RANDOM(state, payload) {
    const { max_number = 10 } = payload;
    state.random = get_random(max_number);
    return state;
}

function ADD_COUNT(state, payload) {
    state.count++;
    return state;
}

function RANDOM_WORD(state, payload) {
    const { randomColor } = payload;
    state.random_word = randomColor;
    return state;
}

class PartThreeHome extends React.Component {

    generateRandom = () => {
        const payload = { max_number: 10 };
        const action = { type: types.GENERATE_RANDOM , payload};
        store.dispatch(action);
        this.forceUpdate();
    }

    addCount = () => {
        const action = { type: types.ADD_COUNT};
        store.dispatch(action);
        this.forceUpdate()
    }

    randomWord = () => {
        const color = ['rebeccapurple', 'orangered', 'lime', 'lawngreen', 'cyan', 'mediumslateblue', 'gold', 'magenta'];
        const randomColor = color[get_random(color.length)];
        const payload = { randomColor };
        const action = { type: types.RANDOM_WORD, payload};
        store.dispatch(action);
        this.forceUpdate()
    }

    render() {

        const state = store.getState();

        const color = state.random_word

        const stateStr = JSON.stringify(state, null, '')

        return (
            <div style={{ background: color }}>
                <div>
                    state
                </div>
                <div>{stateStr}</div>
                <button onClick={this.generateRandom}>Получить число</button>
                <button onClick={this.addCount}>Добавить число</button>
                <button onClick={this.randomWord}>RANDOM WORD</button>
            </div>

        )
    }
}

export default PartThreeHome;

