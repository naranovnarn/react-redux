/** Reducer */
import * as types from './types';
import { MY_ACTION_NAME } from './actions';

const reducer = (state = {}, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.MY_ACTION_NAME: return MY_ACTION_NAME(state, payload);
        default: return state;
    }
    
};

export default reducer;