import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import * as types from './types';

// Небольшое улучшение: GENERATE_RANDOM и ADD_COUNT вынесены в отдельный файл 
// Загляни в src/part-05/actions.js
import { GENERATE_RANDOM, ADD_COUNT } from './actions'; 

const initState = {
  random: 42,
  count: 0
};

const reducer = (state = initState, action) => {

  const { type, payload } = action;

  switch (type) {

    // Тут думаю понятно, функции возвращают обновленный стейт, который в свю очередь возваращаются из reducer
    case types.GENERATE_RANDOM:
        return GENERATE_RANDOM(state, payload);

    case types.ADD_COUNT:
        return ADD_COUNT(state, payload);  

    default: return state;

  }

};

const store = createStore(reducer);

/**
 * Сейчас лучше посмотреть изменения в mapStateToProps #89
 * и добавленный mapDispatchToProps, которые найдешь после компонента.
 * А потом изучи этот компонент.
 */
class PartFive extends React.Component {

  addCount = () => {

    // Вызываем addCount, прокидываемый в Props через mapDispatchToProps.
    this.props.addCount(); // произойдет вызов кода на строчки #128

    // Можно было сделать и так  <button onClick={this.props.addCount}>ADD COUNT</button>
    // Но лучше придерживатся одной стилистики, так как generateRandom не позволит сделать нам
    // подобным образом, некрасиво <button onClick={() => { this.props.generateRandom(13) }}>GENERATE RANDOM</button>
    // А если будет больше логики в generateRandom, то onClick будет громоздкий, в резултате получится каша представления и логки
  }

  generateRandom = () => {
    const max_random = 13;
    this.props.generateRandom(max_random); // #132
  }

  render() {

    console.log('render -> props', this.props);

    // Через mapStateToProps были прокинуты Props.
    // Теперь достаем эти Props и рисуем их.
    const { random, count, countType } = this.props;

    /**
     * Значение countType можно было вычислить и тут
     * Но для примера я вынес его в mapStateToProps()
     * В некоторых случаях это позволяет сделать render() чище
     * const countType = (this.props.count % 2 === 0) ? 'Четное' : 'Нечетное';
     */

    return (
      <div className="PartFive">
        <pre>RANDOM: {random}</pre>
        <pre>COUNT: {count} <b>{countType}</b></pre>

        <button onClick={this.addCount}>ADD COUNT</button>
        <button onClick={this.generateRandom}>GENERATE RANDOM</button>
      </div>
    );
  }

}

// Сделаем небольшие улучшения дл mapStateToProps
const mapStateToProps = (state) => {

    // Добавим немного логики для создания "рукотворного" prop countType на основе значения из State
    const countType = (state.count % 2 === 0) ? 'Четное' : 'Нечетное';

    return {
      // Прокинем "рукотворный" prop countType
      countType: countType,

      // Обычно целиком State не прокидывается (Как в предыдущей части (part-04) делалось state: state).
      // А прокидываются конкретные свойства из State, которые нужны нам в компоненте.
      // Вот так, нам конкретно нужен random и count из State, а не весь State:
      random: state.random,
      count: state.count,
    };

}

// В предыдущей части мы не использовали mapDispatchToProps, который идет вторым аргументом в connect
// Так вот mapDispatchToProps нужен, чтобы прокинуть метод dispatch в наш компонент

// Рассмотрим аргументы mapDispatchToProps
// dispatch - функция для лиспатчинга, та, которая есть у Store (store.dispatch({ACTION}))
// ownProps - собственные Props компонента например myLuckyProps из <PartFiveWrapped myLuckyProps={777} />
// В отличии от mapDispatchToProps функция mapDispatchToProps взывается один раз при создании компоненета
const mapDispatchToProps = (dispatch, ownProps) => {

  console.log('mapDispatchToProps -> ownProps', ownProps);

  return {

    // Теперь, если это явно не написать, то не будет доступен this.props.dispatch
    // Но это не нужно, если тебе не требуется вызывать dispatch внутри компонента
    // Так как все диспатчи можно держать тут, как показано на примере addCount и generateRandom
    dispatch: dispatch, // Не обязательно!

    // Данные методы addCount и generateRandom
    // будут доступны в компоненте PartFive через this.props.addCount и this.props.generateRandom
    // что логично из названия параметра: mapDispatchToProps 
    addCount: () => {
      dispatch({ type: types.ADD_COUNT });
    },

    generateRandom: (max_number) => {
      dispatch({ type: types.GENERATE_RANDOM, payload: { max_number: max_number } });
    },

    // Вообще mapDispatchToProps возволяет прокинуть в Props что угодно. Как нпример sayHello и test_42
    // Но не нужно этим злоупотреблять, используй mapDispatchToProps, лишь чтобы диспатчить экшен.

    // this.props.sayHello();
    // sayHello: () => {
    //     alert('Hello!');
    // },

    // this.props.test
    // test_42: 42,

  }

}

// const YourWrappedComponent = connect(mapStateToProps, mapDispatchToProps)(YourComponent);
// mapDispatchToProps идет вторым аргументом
// кстати, если нам не нужен будет mapStateToProps, то его можно указать как null: connect(null, mapDispatchToProps)(YourComponent);
const PartFiveWrapped = connect(mapStateToProps, mapDispatchToProps)(PartFive);

// Так теперь продолжите изучать компонент PartFive

class MyApp extends React.Component {

    render() {
      return (
        <Provider store={store}>
          <PartFiveWrapped myLuckyProps={777} />
        </Provider>
      );
    }
  
}

export default MyApp;