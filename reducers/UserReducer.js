//Documentation by Brandon Bunce
//initializes USER_STATE as a default empty user
const INITIAL_USER_STATE = {
    username: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: "",
    race: "",
    major: "",
    foodHistory: [],
    diet: { },
    signUpDate: Date.now(),
}

//populates the user with data
const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        //sets the user
        case 'SET_USER':
            state = action.payload;
            break;
        //adds Food to user history
        case 'ADD_FOOD_TO_HISTORY':
            const previousDiet = state.diet;
            const foodEntry = action.payload;
            const newCalories = previousDiet.total - foodEntry.food.calories;
            const newProtein = previousDiet.protein - foodEntry.food.protein * 9;
            const newFat = previousDiet.fat - foodEntry.food.fat * 4;
            const newCarbohydrates = previousDiet.carbohydrates - foodEntry.food.carbs * 4;
            state = {
                ...state,
                foodHistory: [
                    ...state.foodHistory,
                    foodEntry,
                ],
                diet: {
                    total: newCalories,
                    protein: newProtein,
                    fat: newFat,
                    carbohydrates: newCarbohydrates,
                    lastCalculated: previousDiet.lastCalculated,
                }
            }
            break;
        //changes the username of the user
        case 'CHANGE_USERNAME':
            state = {
                ...state,
                username: action.payload,
            };
            break;
        //changes the age of the user
        case 'CHANGE_AGE':
            state = {
                ...state,
                age: action.payload,
            };
            break;
        //changes the email of the user
        case 'CHANGE_EMAIL':
            state = {
                ...state,
                email: action.payload,
            };
            break;
        //changes the weight of the user
        case 'CHANGE_WEIGHT':
            state = {
                ...state,
                weight: action.payload,
            };
            break;
        //changes the height of the user
        case 'CHANGE_HEIGHT':
            state = {
                ...state,
                height: action.payload,
            };
            break;
        //changes the activity level of the user
        case 'CHANGE_ACTIVITY_LEVEL':
            state = {
                ...state,
                activityLevel: action.payload,
            };
            break;
        //changes the race of the user
        case 'CHANGE_RACE':
            state = {
                ...state,
                race: action.payload,
            };
            break;
        //changes the major of the user
        case 'CHANGE_MAJOR':
            state = {
                ...state,
                major: action.payload,
            };
            break;
        //changes the gender of the user
        case 'CHANGE_GENDER':
            state = {
                ...state,
                gender: action.payload,
            };
            break;
        //changes the diet of the user
        case 'CHANGE_DIET':
            state = {
                ...state,
                diet: action.payload,
            };
            break;
        //else, do nothing
        default:
            break;
    }
    return state;
}

//exports this module to make accessible by the rest of the program
export default userReducer;
