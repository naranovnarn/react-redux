import * as types from './types';

function get_random(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function GENERATE_RANDOM(state, payload) {
    const { min, max } = payload;
    const random_number = get_random(min, max);
    const nextState = { ...state, random: random_number };
    return nextState;
}

export function REDUX_LOGGER(state, payload) {
    const { action } = payload;
    const newLog = createNewLog(action);
    const nextState = { ...state, logs: [ ...state.logs, newLog ] };
    return nextState;
}

function createNewLog(action) {

    const newLog = {};

    newLog.type = action.type;
    newLog.payload = action.payload;

    return newLog;

}

export function generateRandom(min = 10, max = 99) {
    return { type: types.GENERATE_RANDOM, payload: { min: min, max: max } };
}