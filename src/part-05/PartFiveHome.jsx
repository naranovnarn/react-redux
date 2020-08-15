import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import * as types from './types';
import { GENERATE_RANDOM , ADD_COUNT } from './actionsHome';
import { addCount, generateRandom} from './actionCreators'


const initState = {
    random: 5,
    count: 0
};

const reducer = (state = initState, action) => {

    const { type, payload } = action;
    
    switch(type) {
        case types.GENERATE_RANDOM: return GENERATE_RANDOM(state, payload);
        case types.ADD_COUNT: return ADD_COUNT(state)
        default: return state;
    }
}

const store = createStore(reducer);

class PartFiveHome extends React.Component {

    generateRandom = () => {
        this.props.generateRandom();
    }

    addCount = () => {
        this.props.addCount();
    }

    render() {
        const state = JSON.stringify(this.props);
        return(
            <div>
                <div>state</div>
                <div>{state}</div>
                <button onClick={this.generateRandom}>Сгенерировать рандом</button>
                <button onClick={this.addCount}>Добавить число</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        random: state.random,
        count: state.count
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: () => {
            dispatch( addCount() )
        },

        generateRandom: () => {
            dispatch( generateRandom() )
        }
    };
};

const PartFiveWrapped = connect(mapStateToProps, mapDispatchToProps)(PartFiveHome);

class myAppHome extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <PartFiveWrapped/>
            </Provider>
        );
    }
}

export default myAppHome
