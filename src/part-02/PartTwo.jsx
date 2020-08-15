import React, { Component } from 'react';
import { createStore } from 'redux';

const GENERATE_RANDOM = 'GENERATE_RANDOM';
const ADD_COUNT = 'ADD_COUNT';

function get_random(max_number) {
  return Math.floor(Math.random() * max_number);
}


const initState = {
  random: 42,
  count: 0
};


const reducer = (state = initState, action) => {
  const { type } = action;

  if (type === GENERATE_RANDOM) {
    const { max_number = 10 } = action; 
    state.random = get_random(max_number);
    return state;
  }

  if (type === ADD_COUNT) {
    state.count++;
    return state;
  }

  return state;

};
 
const store = createStore(reducer);

/*
  Изучите данный пример самостоятельно
  Теперь через компонент мы можем меняем не одно значение в State,
  который теперь хеш-таблица
*/
class PartTwo extends React.Component {

  generateRandom = () => {
    const action = { type: GENERATE_RANDOM, max_number: 13 };
    store.dispatch(action);
    this.forceUpdate();
  }

  addCount = () => {
    const action = { type: ADD_COUNT };
    store.dispatch(action);
    this.forceUpdate();
  }

  render() {

    // Так как наш State теперь хеш-таблица
    // Приведем его к строке с помощью JSON.stringify
    const state = store.getState();
    const debugg_state = JSON.stringify(state, null, ' ');

    console.log(state)

    return (
      <div className="PartTwo">
        
        <b>State:</b>
        <pre>{debugg_state}</pre>

        <button onClick={this.generateRandom}>GENERATE RANDOM</button>
        <button onClick={this.addCount}>ADD COUNT</button>
      </div>
    );
  }

}

export default PartTwo;