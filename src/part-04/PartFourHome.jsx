import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import * as types from './types';


const initState = {
    count: 0,
    arrRandomNumbers: []
};

const reducer = (state = initState, action) => {
    const { type, payload} = action;
    console.log(state, action);

    switch (type) {
        case types.GENERATE_RANDOM:  return generateRandom(state, payload) ;
        case types.ADD_COUNT: return addCount(state, payload)
        default: return state;
    }

    
}

function createRandom() {
    return Math.floor(Math.random() * 100);
}

function generateRandom(state, payload) {
    const newArrRandomNumbers = state.arrRandomNumbers;
    newArrRandomNumbers.push(createRandom());
    const newState = { ...state, arrRandomNumbers: newArrRandomNumbers};
    return newState;
}

function addCount(state, payload) {
    const newCount = state.count;
    const newState = { ...state, count: newCount + 1}
    return newState;
}

const store = createStore(reducer);

class PartFourHome extends React.Component {

    generateRandom = () => {
        const action = { type: types.GENERATE_RANDOM};
        this.props.dispatch(action);
    }

    addCount = () => {
        const action = { type: types.ADD_COUNT};
        this.props.dispatch(action)
    }

    render() {

        const state = JSON.stringify(this.props.state);
        console.log(state);
        console.log(this.props)
        return (
            <div>
                <div>state:</div>
                <div>{state}</div>
                <button onClick={this.generateRandom}>Сгенерировать число</button>
                <button onClick={this.addCount}>Увеличить счет</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
};

const PartFourWrapped = connect(mapStateToProps)(PartFourHome);

class MyAppHome extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PartFourWrapped/>
            </Provider>
        )
    }
}

export default MyAppHome;