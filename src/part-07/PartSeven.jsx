import React, { useEffect, useRef } from 'react';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';

import * as types from './types';
import { GENERATE_RANDOM, REDUX_LOGGER, generateRandom } from './actions';

import styles from './styles.module.css';

const initState = { random: null, logs: [] };

const reducer = (state = initState, action) => {

    const { type, payload } = action;

    state = REDUX_LOGGER(state, { action });

    if (type === types.GENERATE_RANDOM) {
        return GENERATE_RANDOM(state, payload);
    }

    if (type === types.REDUX_LOGGER) {
        return REDUX_LOGGER(state, { action });
    }

    return state;
};

/**
 * В этом уроке пример того, как подрубить Redux DevTools
 * Redux DevTools - это дебаггер для Redux, позводляющий отслеживать диспатчи экшенов, а также изменение стейте
*/

// 1) Нужно установить расширение для браузеа
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru
// https://addons.mozilla.org/ru/firefox/addon/reduxdevtools/

// Соурс расширения и документация: https://github.com/zalmoxisus/redux-devtools-extension

// 2) Прикручиваем middleware к нашему стору (о том, что такое middleware будет рассказано в следующих уроках)
// Браузерное раширение добавляет в глобальный объкт window свойство __REDUX_DEVTOOLS_EXTENSION_COMPOSE__, которое содердит функцию, создающую при вызове соответсвующий middleware
const devToolsEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();


// Раскомментируйте, чтобы убедиться console.log(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

// Пробрасываем middleware вторым аргументом
const store = createStore(reducer, devToolsEnhancer);

// Если используем initialState, то он идет третьим аргументом
// const store = createStore(reducer, initialState, devToolsEnhancer);  // devToolsEnhancer = fx

// Так все готово, должна быть вкладка Redux в DevTools

// Есть и другие варианты установки, например с использованием пакета, но я думаю нет смыла тащить в проект лишний пакет
// https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm

// А тут небольщой пример, как сделать свой примитивный логгер диспатченных экшенов
function PartSeven(props) {

    console.log('PartSeven -> props', props);

    const inputMin = useRef(null);
    const inputMax = useRef(null);

    useEffect(() => {
        props.generateRandom();
    }, [ ]);

    return (
        <div>
            <p>Random: {props.random}</p>

            <input type="text" ref={inputMin} defaultValue={10} placeholder="min"/>
            <input type="text" ref={inputMax} defaultValue={99} placeholder="max"/>

            <button onClick={() => props.generateRandom(+inputMin.current.value, +inputMax.current.value) }>Random!</button>

            <p>Logger</p>

            <ReduxLoggerTable logs={props.logs} />

        </div>
    );

}

function ReduxLoggerTable(props) {

    const { logs } = props;

    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.row}>
                    <td className={styles.cell}>Type</td>
                    <td className={styles.cell}>Payload</td>
                </tr>
            </thead>
            <tbody>
                {logs.map((log) => {
                    return(
                        <tr className={styles.row}>
                            <td className={styles.cell}>{log.type}</td>
                            <td className={styles.cell}>{JSON.stringify(log.payload)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

function mapStateToProps(state) {

    const { random, logs } = state;
    const reverseLogs =  logs.slice().reverse(); // почему сразу

    return {
        random: random,
        logs: reverseLogs
    }

}

// Кстити, можно кидать не функцию, а объект c экшен криэйторами на место mapDispatchToProps
// Как видно с { generateRandom }
// он автоматически превратитья в пропс props.generateRandom = () => dispatch(generateRandom())
const PartSevenWrapped = connect(mapStateToProps, { generateRandom })(PartSeven);

export default class MyApp extends React.Component {

    render() {
      return (
        <Provider store={store}>
          <PartSevenWrapped />
        </Provider>
      );
    }
  
}