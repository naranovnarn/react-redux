import * as types from './types'

export function generateRandom () {
    const max_random = 1000;
    return {
        type: types.GENERATE_RANDOM,
        payload: { max_random }
    };
}

export function addCount () {
    return {
        type: types.ADD_COUNT
    }
}