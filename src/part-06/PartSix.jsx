import React from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

import * as types from './types';
import { GENERATE_RANDOM } from './actions';

const reducer = (state = { random: null }, action) => {
    const { type, payload } = action;
    if (type === types.GENERATE_RANDOM) return GENERATE_RANDOM(state, payload);
    return state;
};
  
const store = createStore(reducer);  

/**
 * Привет! Не забывайте смотреть отсылки на код по таким обозначением #777 (#НОМЕР_СТРОКИ)
 * 
 * Этот урок про Action Creators
 * Как мы значем экшены (action) являются объектами, как: {type : "GENERATE_RANDOM", payload: { min, max } } или {type : "SEND_MESSAGE", text: "Hello!" }
 * А экшенов криэйторы (Action Creators) это функции, которые при вызове возвращают нам экшен
*/

// Вот пример функций Action Creators (generateRandom, sendMessage, sendImportantMessage, doIt)
function generateRandom(min = 10, max = 99) {
     // возращается новый экшен на основе пришедших параметров функции
    return { type: types.GENERATE_RANDOM, payload: { min: min, max: max } };
}

function sendMessage(text) {
    return { type: "SEND_MESSAGE", text }; // можно просто писать кратко, где можно, как помним http://jsraccoon.ru/es6-object-literal
}

function sendImportantMessage(text) {
    const upperText = text.toUpperCase(); // В экшен криэйторе можно производить дополнительную логику для формирования итоговых значений в экшене
    return { type: "SEND_MESSAGE", text: upperText };
}

function doIt() {
    return { type: "DO_IT" };
}

// Далее применяем наш экшен криейэтор, вызывая там где нам нужен экшен

// Было
// store.dispatch( { type: types.GENERATE_RANDOM, payload: { max_number: 100 } } );

// Стало
// store.dispatch( generateRandom(100) );

// Можно заметить премущество такого подхода:

// такой код легче читать
// удобно переиспользовать
// если пишем тесты, то можно покрыть тестами наш экшен криэйтор

/** Начиная с этого урока, я буду использовать функциональный компонет, но все это справедливо и для классовых компонентов */
function PartSix(props) {

    console.log('PartSix -> props', props);

    const { dispatch } = props;

    // Пару вариантов вызова

    // Сформируем callback для кнопок
    const random_10 = () => dispatch( generateRandom() ); // #23 по-умолчанию 10...99

    const random_1000 = () => dispatch( generateRandom(1000, 9999) );

    // А это другой вариант
    // Чтобы его использовать нужно реализовать конструкцию dispatch( actionCreator() ) в mapDispatchToProps #143
    const random_100 = props.generateRandom100; // круглые скобки вызова не ставим, иначе вы задиспатчите экшен прямо тут!

    // Еще вариант, также обратите внимаение на mapDispatchToProps строка #144
    const random_10000 = () => props.generateRandom(10000, 99999);

    // А вот так не будет работать. Подумайте почему. И исправьте.
    // const random_42 = props.generateRandom(42); // ну будет работать

    // Как видно есть разные варианты, а  есть еще другой при помощи bindActionCreators
    // bindActionCreators испортирутся из #2 redux
    // принмает функцию в которой вызов экшен криэйтора и ссылку на dispatch
    const random_0 = bindActionCreators(() => generateRandom(0, 9), dispatch);
    // Дальше можно использовать так: <button onClick={random_0}>Random 0...9!</button>

    // В добавок bindActionCreators может принять объект с функцими вместо одной функции
    const randomActions = bindActionCreators({
        random_0:    () => generateRandom(0, 9),
        random_10:   () => generateRandom(10, 99),
        random_100:  () => generateRandom(100, 999),
        random_1000: () => generateRandom(1000, 9999),
    }, dispatch);
    // В этом случае все диспатичится так: <button onClick={randomActions.random_10}>Random 10...99!</button>

    // Ничего не мешает нам использовать bindActionCreators в mapDispatchToProps
    // Пример посмотрите на строке 149 потом возвращаейтесь сюда

    // И так, тут было представлено два варианта создания callback для диспатча
    // 1) Объявление их внутри компонента (#67-93)
    // 2) Объявление их в mapDispatchToProps (#140-169)
    // 3) Эти два варианта, но с использованием bindActionCreators

    // Почему лучше использовать mapDispatchToProps?
    // Первый вариант будет создавать функции заново при кажом рендере компонента (а это лишний расход ресурсов. хотя в большинстве случаев и не заметный)
    // В отличии от рендера функция mapDispatchToProps вызывается один раз, как мы знаем из прошлых уроков

    // Если используем классовый компонент, то там в контрукторе можно создать наши функции для диспатча

    // construnctor(props) {
    //      super(props);
    //      this.random_1000 = () => this.props.dispatch( generateRandom(1000, 9999) );
    //}
    // render() { return ... <button onClick={this.random_1000}>Random 1000...9999!</button> ... }
    //

    // Хотя так же лучше использовать mapDispatchToProps и для классовый компонентов

    return (
        <div>
            <p>Random: {props.random}</p>
            <div>
                <button onClick={random_0}>Random 0...9!</button>
                <button onClick={random_10}>Random 10...99!</button>
                <button onClick={random_100}>Random 100...999!</button>
                <button onClick={random_1000}>Random 1000...9999!</button>
                <button onClick={random_10000}>Random 10000...99999!</button>
            </div>
        </div>
    );

}

function mapStateToProps(state) {
    return {
        random: state.random
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    //  Свзятать наши генераторы экшенов с dispatch
    return {
        dispatch,
        generateRandom: (min, max) => dispatch( generateRandom(min, max) ),
        generateRandom100: () => dispatch( generateRandom(100, 999) )
    }
}

// Как видно mapDispatchToProps возвращает объект полученный из bindActionCreators
// Так короче чем в mapDispatchToProps, который выше #138
/*
function mapDispatchToProps(dispatch, ownProps) {
    return bindActionCreators({
        random_0:    () => generateRandom(0, 9),
        random_10:   () => generateRandom(10, 99),
        random_100:  () => generateRandom(100, 999),
        random_1000: () => generateRandom(1000, 9999),
    }, dispatch)
}
*/

// А Кому по вкусу приходятся стрелочные функции, делают так:
/*
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    random_0: () => generateRandom(0, 9),
    random_10: () => generateRandom(10, 99),
    //...
}, dispatch);
*/

// Задача mapDispatchToProps
const PartSixWrapped = connect(mapStateToProps, mapDispatchToProps)(PartSix);

export default class MyApp extends React.Component {

    render() {
      return (
        <Provider store={store}>
          <PartSixWrapped />
        </Provider>
      );
    }
  
}