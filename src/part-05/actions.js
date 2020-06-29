function get_random(max_number) {
    return Math.floor(Math.random() * max_number);
}

export function GENERATE_RANDOM(state, payload) {
    const { max_number = 10 } = payload;
    const random_number = get_random(max_number);
    const nextState = { ...state, random: random_number };
    return nextState;
}
  
export function ADD_COUNT(state) {
    const nextState = { ...state, count: state.count + 1 };
    return nextState;
}