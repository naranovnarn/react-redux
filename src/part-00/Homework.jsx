import React from 'react';
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
	if (action.type === 'BANG') {
		state = state + 2;
		if (state > 8) {
			state = 0;
			return state;
		}
		
		return state;
	}

	return state;
}

const store = createStore(reducer);

const callback = () => {
  console.log(store.getState());
}

store.subscribe(callback)

store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );
store.dispatch( {type: 'BANG'} );

const Homework = () => <div className="PartZero">Открой консоль в брузере! Пусть всегда она будет на виду.</div>
export default Homework;