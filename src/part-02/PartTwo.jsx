import React from 'react';
import { createStore } from 'redux';

// type
const GENERATE_RANDOM = 'GENERATE_RANDOM';
const ADD_COUNT = 'ADD_COUNT';

// Функция возвращает случайное число до max_number
// но не включительно max_number
// Используем ее для следующих примеров
function get_random(max_number) {
  return Math.floor(Math.random() * max_number);
}

// Используем хеш-таблицу вмесо примитивного значения, чтобы хранить больше сущностей в State
const initState = {
  random: 42,
  count: 0
};

// Теперь наш редьюсер обрабатывает два экшена: GENERATE_RANDOM #28 и ADD_COUNT #34.
// В него добавили условие для ADD_COUNT
// В предыдущем уроке наш редьюсер обрабатывал только: GENERATE_RANDOM
const reducer = (state = initState, action) => {

  const { type } = action; // Небольшое улучшение, вместо того, чтобы писать в условиях if (action.type... будем if (type...

  if (type === GENERATE_RANDOM) {
    const { max_number = 10 } = action; // Если в экшене не будет свойства max_number, то по-умолчанию будет 10 (вместо undefined)
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