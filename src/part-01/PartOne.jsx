import React from 'react';
import { createStore } from 'redux';
/*
  Это пример простой способ отобразить данные из State в компоненте.
*/

// В предыдущем примере мы использовали строковой литерал 'TICK' для имени экшена.

// Но на практике чаще используют константу
// const TYPE_TICK = 'TICK';
// dispatch({ type: TYPE_TICK })

// Потому что если вы ошибетесь в название экшена { type: 'TIKC' ... },
// то ошибку можно не заметить, так как в конце функции Reducer вернется текущий State
// немного инофрмации на строке #39 в этом файле

// А если вы ошибетесь в имени константы, то сразу узнаете:
// dispatch({ type: TYPE_TIKC })
// Uncaught ReferenceError: TYPE_TIKC is not defined

const GENERATE_RANDOM = 'GENERATE_RANDOM';

// State может хранить любое возможное значение JavaSctipt, например: NaN, undefined, null, String, WeakMap и т.д.
// Выше перечисленные типы редко ипользуются, в отличии от списков (array), хеш-таблиц и деревьев.
// С которыми в дальнейшем будут представлены примеры.
const initState = 0.42; // Number

const reducer = (state = initState, action) => {

  // Нажимайте "GENERATE RANDOM" и смотрите Console
  console.log(state, action);

  if (action.type === GENERATE_RANDOM) {
    const nextState = Math.random();
    return nextState;
    // или просто return Math.random();
  }

  // Всегда выход из reducer() должен сопровождатся возвратом State
  // Во-первых это нужно для инициализации State
  // так как первым по-умолчанию диспатчится специальный зарезервированный экшн { type: "@@redux/INIT..." }
  // в результате которого вызово доходит (return state; #46)

  // Если не верунть State, то по-молчанию функция верент undefined
  // undefined станет значением для State
  return state;

  // Интересный момент, часть имени специального эшена каждый раз случайное, например: @@redux/INITb.f.p.q.5.g или @@redux/INITn.8.i.l.h
  // Поэтому перехватить этот экшен обычным способом мы не можем if (action.type === '@@redux/INIT') { ... }
  // Это сделано, чтобы не было коллизии с именами пользователя
  // Конечно можно перехватить этот экшен используя (action.type).indexOf('@@redux/INIT) !== -1
  // но судя по сгенерированному имени экшена (@@redux/INITb.f.p.q....) авторы Redux, явно на это указали, что делать так не стоит, 

};
 
/** */
const store = createStore(reducer);

/*
  В данном примере используется Class Component,
  но в дальнейших примерах будет показан и Functional Component.
*/
class PartOne extends React.Component {

  // При нажатии кнопки "GENERATE RANDOM" диспатчим экшн { type: GENERATE_RANDOM }
  // Редьюсер зайдет в соответствующее условие на строке #33
  // в итоге значением State станет новое случайно число из Math.random()
  generateRandom = () => {
    const action = { type: GENERATE_RANDOM };
    store.dispatch(action);

    // На этом шаге в State уже будет записано новое случайное число.
    // Но об этом компонент PartOne не знает и продолжает отображать результат последнего вызова render();
    // То есть представление PartOne не синхронизировано со State.

    // Хорошо, но мы уверены в том, что State обновился после store.dispatch(action);
    // Так что принуждаем выполнить render() заново, чтобы он отрисовал актуальные данные State
    this.forceUpdate();

    // Но это грязный хак для примера, в дальннейших уроках узнаем
    // приемлемый подход для такой проблемы

  }

  render() {

    // Тут каждый раз при render() достаем акутальный на момент вызова State
    const state = store.getState();

    return (
      <div className="PartOne">
        <pre>{state}</pre> {/** Выводим в компоненте значение State */}
        <button onClick={this.generateRandom}>GENERATE RANDOM</button>
      </div>
    );
  }

}

export default PartOne;