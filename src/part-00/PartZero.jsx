import React from 'react';
import { createStore } from 'redux';

/*
  В этом примере, показана основаня суть Redux.

  Redux самостоятельная билиотека, ее можно использовать независимо от фреймворков.
  Устанавливается из пакета redux: npm install --save redux

  Основные понятия Redux:

  State - хранимые данные
  Store - объект "обертка" над State, позволяющая манипулировать State: читать, изменять

  Reducer - функция содержащая бизнес-логику, которая "изменяет" State
            Reducer в Store
  
  Action - описание операции в виде объекта { type: 'DOIT' },
           получив Action, Reducer решает как "изменить" State

  Dispatch - инициация выполнения Action
*/
const reducer = (state = 0, action) => {

  console.log('reducer -> action', state, action);

  if (action.type === 'TICK') {
    state++; // +1 при каждом диспатче экшена 'TICK'
    return state;
  }

  return state;

};

// Создаем Store, передав ему как минимум Редьюсер
const store = createStore(reducer); // У createStore есть и другие аргументы, но про них будет в других частях

// Диспатчим экшен с именем TICK
// В результате видно, как увеличивается значение State
// При диспатсче вызывается reducer(state, { type: 'TICK' }) 
store.dispatch({ type: 'TICK' });
store.getState(); // Вернет 1

store.dispatch({ type: 'TICK' });
store.getState(); // Вернет 2

store.dispatch({ type: 'TICK' });
store.dispatch({ type: 'TICK' });
// Сколько вернет store.getState() ?
// console.log('Ответ', store.getState()) // Проверь свой ответ

// Метод subscribe 
// Позовляет слушать событие, которое возникает при диспатче экшена
// А точнее после того, как выполнится редьюсер, после диспатча экшена
// В subscribe аргументом прокидываем callbaсk функцию
const callback = () => {
  console.log('exampleListener', store.getState());
};

store.subscribe(callback);

store.dispatch({ type: 'TICK' });
store.dispatch({ type: 'TICK' });

// В консоли выведется
// > 'exampleListener' 3
// > 'exampleListener' 4

// В редьюсере нет условия для 'POCK'
// Поэтому State не изменится, но слушатель события будет вызван
store.dispatch({ type: 'POCK' });

// Можно сколько угодно вешать слушателей события на Store

// Есть возможность отписаться от события
// Вызов subscribe возврашает код для этого
const unsubsribe = store.subscribe(() => { console.log('Привет!'); });

store.dispatch({ type: 'POCK' });
store.dispatch({ type: 'POCK' });
// > 'Привет!'
// > 'Привет!'

unsubsribe(); // Вызов выполняет отписку () => { console.log('Привет!'); }

store.dispatch({ type: 'POCK' });
// Теперь коносль "не приветсвует"

// Домашнее задание выполняй тут
// console.clear();

// ...

/*
  <PartZero /> просто сообщение в браузере.
  В следующих примерах будет показано взаимодействие компонентов React и Redux.
*/
const PartZero = () => <div className="PartZero">Открой консоль в брузере! Пусть всегда она будет на виду.</div>
export default PartZero;