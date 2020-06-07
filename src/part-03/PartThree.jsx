import React from 'react';
import { createStore } from 'redux';

// Еще рефакторинг для типов
// Типы вынесены в отдельный файл и доступны через объект types
// Теперь достаточно импортировать типы там где они нужны
import * as types from './types'; // Посмотрите файл src/part-03/types.js

function get_random(max_number) {
  return Math.floor(Math.random() * max_number);
}

const initState = {
  random: 42,
  count: 0
};

const reducer = (state = initState, action) => {

  /**
    Как видели раньше с max_number, всю полезную нагрузку можно держать в виде свойств экшена
    Например: { type: 'USER_LOGIN', login: 'admin_lamer', password: 'qwerty' } (полезная нагрузка login и password)
    Но будет удобнее, если соблюдать одну формальность и полезную нагрузку держать в свойстве payload
    Вот так: { type: 'USER_LOGIN', payload: { login: 'admin_lamer', password: 'qwerty' } }
    К тому же это позволит упростить нам организацию кода по следующему примеру #32.
  */

  const { type, payload } = action;

  // Как видно далее, можно вынести логику экшенов из Редьюсера в отдельные функции (GENERATE_RANDOM и ADD_COUNT)
  // Каждая функция при ее вызове должна возвращать State
  switch (type) {

    case types.GENERATE_RANDOM: return GENERATE_RANDOM(state, payload); // Если бы не payload, то пришлось бы писать GENERATE_RANDOM(state, login, password); что на практике было бы не удобно
    case types.ADD_COUNT: return ADD_COUNT(state, payload);  

    default: return state;

  }

  // return state; // Не нужно, так как его заменяет default: return state; #37

  /*
    От Redux есть одно требование, чтобы экшн был объектом и чтобы использовалось имя type
    Иначе Redux выбросит ошибку. Такое ограничение вполне разумно, потому что, например опечатка в слове type
    будет сразу обнаружена, что позволит сэкономить часы отладки

    А конкретно к слову payload требований нет, но оно используется в документации и во многих туториалах в интренете
    Но лучше использовать слово payload, так как другим программистам будут ясны ваши намерения

    На данный момент мы качестве экшена использовали объект { type: ... }
    В дальнейших примерах увидим, как в качестве экшена передается ссылка на функцию (да, существует способ нарушать требования Redux к экшену используя middlewares)
    (например, при использовании библиотеки react-thunk)
  */

};

// В этих примерах функции GENERATE_RANDOM и ADD_COUNT небольшие
// Но в практике они бывают на много строк, так как в них производится болшая часть бизнес-логики приложения
function GENERATE_RANDOM(state, payload) {
  const { max_number = 10 } = payload;
  state.random = get_random(max_number);
  return state;
}

function ADD_COUNT(state) {
  state.count++;
  return state;
}
 
const store = createStore(reducer);

class PartThree extends React.Component {

  generateRandom = () => {
    // Тут используем идею с payload
    const payload = { max_number: 13 };
    // И не забываем теперь писать types.GENERATE_RANDOM, а не просто GENERATE_RANDOM
    const action = { type: types.GENERATE_RANDOM, payload: payload }; // payload 
    store.dispatch(action);
    this.forceUpdate();
  }

  addCount = () => {
    const action = { type: types.ADD_COUNT }; // Тут полезной нагрузки нет, нет смысла писать payload: {}

    store.dispatch(action);
    this.forceUpdate();
  }

  render() {

    const state = store.getState();
    const debugg_state = JSON.stringify(state, null, ' ');

    return (
      <div className="PartThree">
        
        <b>State:</b>
        <pre>{debugg_state}</pre>

        <button onClick={this.generateRandom}>GENERATE RANDOM</button>
        <button onClick={this.addCount}>ADD COUNT</button>
      </div>
    );
  }

}

export default PartThree;