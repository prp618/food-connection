//Documentation by Brandon Bunce
//sets INITIAL_FOOD_STATE as a list of data
const INITIAL_FOOD_STATE = { 
    list: [],
}

//foodReducer is initialized by populating the initial food state with data
const foodReducer = (state = INITIAL_FOOD_STATE, action) => {
    switch (action.type) {
        //if action type is SET_FOODS, then populate INITIAL_FOOD_STATE by performing action.payload
        case 'SET_FOODS':
            state = {
                ...state,
                list: action.payload,
            }
            break;
        //if action type is not SET_FOODS, do nothing
        default:
            break;
    }
    //returns either default or applies action to the selected food
    return state;
}

//exports this module to be accessible by the rest of the program
export default foodReducer;
