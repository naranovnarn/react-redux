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