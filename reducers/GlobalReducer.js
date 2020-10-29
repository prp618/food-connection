//documentation by Brandon Bunce
//Set INITIAL_GLOBAL_STATE to currently slected food
const INITIAL_GLOBAL_STATE = {
    selectedFood: {},
}

//perform reducer action based on selected food
const globalReducer = (state = INITIAL_GLOBAL_STATE, action) => {
    switch (action.type) {
        //if action = SELECT_FOOD, 
        case 'SELECT_FOOD':
            state = {
                ...state,
                selectedFood: action.payload,
            }
            break;
        //in default case, do nothing
        default:
            break;
    }
    return state;
}

//exports this object, making it accessbile for other modules and scripts in this program
export default globalReducer;
