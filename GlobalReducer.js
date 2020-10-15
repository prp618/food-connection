const INITIAL_GLOBAL_STATE = {
    selectedFood: {},
}

const globalReducer = (state = INITIAL_GLOBAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_FOOD':
            state = {
                ...state,
                selectedFood: action.payload,
            }
            break;
        default:
            break;
    }
    return state;
}

export default globalReducer;
