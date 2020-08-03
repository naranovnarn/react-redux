import * as types from './types';

/** Action */
export function MY_ACTION_NAME(state, payload) {
    const { data } = payload;
    return { ...state, data };
}

/** Action Creators */
export function myActionName(data) {
    return { type: types.MY_ACTION_NAME, payload: { data } };
}

export function myActionNameReset() {
    const data = null;
    return { type: types.MY_ACTION_NAME, payload: { data } };
}