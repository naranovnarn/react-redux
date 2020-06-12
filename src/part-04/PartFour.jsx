import React from 'react';
import { createStore } from 'redux';

// Общепринятая библиотека react-redux (https://react-redux.js.org/)
// позволяет связать Redux с нашими React компонентами.
// А именно дает вспомогательный код, позволяющий прокинуть данные State в наши компоненты
// и способ диспатчить экшены из наших компонентов.

// К удобству добавляется то, что другой разработчик, знающий "React Redux",
// с меньшими усилиями разберется в вашем коде, а также сможет дорабатывать его
// в том же идиоматическом стиле, что дает "React Redux"

// И так, импортируем пару штук из "React Redux"
import { Provider, connect } from 'react-redux';

import * as types from './types';

const initState = {
  count: 0
};

// Для начала посмотри компонент <PartFour /> на строке #, а потом вернись к этому месту
const reducer = (state = initState, action) => {

  const { type, payload } = action;

  console.log('');
  console.log('reducer -> action', action);

  // Тут я убрал switch и использовал if только для наглядности
  if (type === types.ADD_COUNT) {

      // Вот тут есть важный момент, с которым многие, изучающие Redux сталкиваются, если не разобрались в документации.
      // Если этот момент не понимать, то будут возникать трудноуловимые баги.

      // Если мы будем использовать эти строчки, то State изменится
      // НО mapStateToProps() # не будет вызван и компонент не получит обновленный State
      // Причина: "React Redux" для избежания лишнего рендера компонентов может НЕ вызывать mapStateToProps()
      // даже если произошел диспатч экшена и данные в State изменились

      // Так происходит из-за того, что "React Redux" сравнивает предыдущий State и новый State, который возвращается после диспатчинга экшена
      // И если предыдущий State === возвращаемому State, то mapStateToProps() НЕ вызывается.
      // А следовательно компонент може тне узнать об изменениях в State и продолжать отображать то, что не соответвует новым данным из State.

      // Далее две строчки кода #, которые мы использовали раньше, демонстрируют эту проблему.
      // state это объект, внутри него изменился count, но ссылка на объект осталась прежней
      // так что возвращаемый state === тому, который был на шаг назад
      // state.count++; // можно их раскомментировать и увидеть,
      // return state;  // что компонент не реагирует на изменения State при нажатии на кнопку "ADD COUNT", которая диспатчит экшен.

      // А вот так будет работать
      // Просто копируем state # и изменяем значение свойства count
      const add_count = state.count + 1;
      const nextState = { ...state, count: add_count };

      // Теперь state !== nextState и "React Redux" вызовет mapStateToProps()
      return nextState;

      // Если initState содержит примитивный тип данных, то такая проблема не возникает. (42 !== 13)
      // Это проблема касается объектов и массивов, которые сравниваются по ссылке.

  }

  return state;

};

const store = createStore(reducer);

/** */
class PartFour extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor -> props', JSON.stringify(props));
  }

  componentDidMount() {
      console.log('PartFour -> componentDidMount');
  }
  
  componentDidUpdate(prevProps, prevState) {
      console.log('PartFour -> componentDidUpdate');
  }

  // Для примера оставил только ADD_COUNT
  addCount = () => {
    
    const action = { type: types.ADD_COUNT };
    
    // Можно вызывать store.dispatch(action) технически проблем нет.
    
    // Но "React Redux" дает другой способ для диспатчинга.
    // И этим способом нужно пользоваться по нескольким причинам:

    // 1) Код отвечающий за создание store будет хранится в отдельном файле
    //    А значить пришлось бы store лишний раз импортировать в каждый файл с компонентом, которому надобно диспатчить.
    //    C "React Redux" этом нет необходимости писать import store from '../store' в котором будет export { store }

    // 2) Если понадобится серверный рендеринг, то придется избавлятся от импорта store.
    //    Так как он импортируется как Singleton и будет всегда одним экземляром на протяжении работы Node.js
    //    В то время как для серверного рендеринга на каждый запрос необходимо создавать новый экземляр store
    //    Иначе все пользователи будут лезть в одно хранилище. Представте, что все пользователи
    //    пользуются одним почтовым ящиком, вы бы видели не только свои письма, но и чужие,
    //    а кто-то вообще мог удалять ваши письма, как впрочем и вы. В этом то и проблема.
    //   
    // Но вторая причина может быть неубедительна, если вы уверены, что серверный рендеринг вам не понадобится

    // И так воспользовашись connect # в наш компонент теперь прокидывается дополнительный Prop под названием dispatch
    // А значит можно диспатчит так вместо store.dispatch(action)
    this.props.dispatch(action);

    // В следующих уроках будет показан дополнителный способ доступ к dispatch

    // Удаляем this.forceUpdate() теперь в нем отпала необходимости.
    // Так как теперь будут приходить Props
    // Ну а при изменении значений Props компонента, его метод render() вызывается автоматически
    // То есть обычное поведение копмпонентов React и никакой магии

  }

  render() {

    // Удаляем эти строки #, теперь мы работаем со Store не на прямую
    // а через connect c mapStateToProps #
    // const state = store.getState();
    // const debugg_state = JSON.stringify(state);

    // Посмотрим props в Console
    // Теперь в компонент автоматически приходят props
    // Props "secret" и "state" взялись из mapStateToProps 
    // "myLuckyProps" взялся из <PartFourWrapped myLuckyProps={777} />
    console.log('render -> props', this.props);

    // Такой момент, в консоли можно было бы увидеть, что вызов render() и mapStateToProps() задваивается подряд, хотя для этого нет причины
    // Чтобы это не происходио и не раздражало, я убрал компонент <React.StrictMode> # в react_redux/src/index.js
    // Потому что это side effect работы Strict Mode, когда мы используем "React Redux"
    // https://reactjs.org/docs/strict-mode.html
    // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects

    const debugg_state = JSON.stringify(this.props.state);
    const debugg_props = JSON.stringify(this.props);

    return (
      <div className="PartFour">

        <b>this.props.state:</b>
        <pre>{debugg_state}</pre>

        <b>this.props:</b>
        <pre>{debugg_props}</pre>

        <button onClick={this.addCount}>ADD COUNT</button>
      </div>
    );
  }

}

// При изменении State вызывается mapStateToProps 
const mapStateToProps = (state) => {

    console.log('mapStateToProps -> state', state);

    // Из mapStateToProps возврашается объект (иначе будет ошибка)
    // Этот объект превращается в Props
    // Работает примерно так:
    // <Price {...best_price} /> => <Price price={10} currency={'$'} />, где best_price = { price: 10, currency: '$'  }

    // Ключ становится именем Prop, а значение ключа становится значением это Prop, как видно.

    return {
      // propName: 'PropValue'
      // Можно и свои значения встаить не из State
      secret: 42,

      // Для примера прокинем State целиком, хотя
      // обычно прокыдываются отдельные свойства State,
      // что будет видно в следущих уроках
      state: state
    };

    // Эти данные будут доступны в компоненте через this.props.secret и this.props.state

}

// C помощью connect мы даем доступ нашему компоненту к Store
// Функция connect возвращает Higher-Order Component
// То есть наш компонент PartFour в обертке, которая будет
// отвечать за передачу в компонент нужных данных в Props из mapStateToProps
// и следить за обновлением State, чтобы вызывать mapStateToProps() при обновлении State
const PartFourWrapped = connect(mapStateToProps)(PartFour);

// Такой синтаксис, в с mapDispatchToProps познакомимся в след уроке
// const YourWrappedComponent = connect(mapStateToProps, mapDispatchToProps)(YourComponent);

// Нужно добавить корневой компонент <Provider store={СТОР}>

// Для компонентов, которые внутри дерева <Provider /> в mapStateToProps будет приходить тот Store,
// который передан в <Provider store={ЭТОТ_СТОР}>

// Можно иметь много Store, каждый вызов createStore(SOME_REDUCER) создает независимый Store
// Но этот кейс редко бывает нужен в приложении:
/*
  const store_1 = createStore(...);
  const store_2 = createStore(...);
  ...
  <>
    <Provider store={store_1}>
      <SomeComponent /> // Компоненту SomeComponent в mapStateToProps будет приходить State из store_1
    </Provider>

    <Provider store={store_2}>
      <AnotherComponent /> // А тут в mapStateToProps будет приходить State из store_2
    </Provider>
  </>
*/

// И поэтому всегда корневым компонетом для всего приложения можно делать один общий Provider 
// <Provider store={store}>
class MyApp extends React.Component {

    render() {
      return (
        <Provider store={store}>

          <PartFourWrapped myLuckyProps={777} />
          {/* <SomeAnotherComponent /> */}

        </Provider>
      );
    }
  
}

export default MyApp;