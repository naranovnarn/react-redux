import React from 'react';
import { createStore } from 'redux';

const initState = 100;

const GENERATE_RANDOM = 'GENERATE_RANDOM';

const reducer = (state = initState, action) => {
  if (action.type === GENERATE_RANDOM) {
    const nextState = Math.random().toFixed(3);
    return nextState;
  }

  return state;
}

const store = createStore(reducer);


class PartOneHome extends React.Component {

  componentDidMount() {
    const callBack = () => {
      this.forceUpdate()
    }
    store.subscribe(callBack)
  }

  generateRandom = () => {
    const action = { type: GENERATE_RANDOM };
    store.dispatch(action);
  }

  render () {
    const state = store.getState()
    return (
      <div>
        <pre>{state}</pre>
        <button onClick={this.generateRandom}>Получить случайное число</button>
      </div>
    )
  }
}

export default PartOneHome;