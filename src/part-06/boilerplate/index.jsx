import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import ExampleComponent from './ExampleComponent';

const store = configureStore({ data: null });

export default class Index extends React.Component {

    render() {
      return (
        <Provider store={store}>
          <ExampleComponent />
        </Provider>
      );
    }

}