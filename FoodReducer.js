const INITIAL_FOOD_STATE = { 
    list: [],
}

const foodReducer = (state = INITIAL_FOOD_STATE, action) => {
    switch (action.type) {
        case 'SET_FOODS':
            state = {
                ...state,
                list: action.payload,
            }
            break;
        default:
            break;
    }
    return state;
}

export default foodReducer;
