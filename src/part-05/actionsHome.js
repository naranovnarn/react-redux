function getRandom(max_random) {
    return Math.floor(Math.random() * max_random)
};

export function GENERATE_RANDOM(state, payload) {
    const { max_random = 10 } = payload;
    const nextState = { ...state, random: getRandom(max_random)};
    return nextState;
}

export function ADD_COUNT(state, payload) {
    const nextState = { ...state, count: state.count + 1};
    return nextState;
}