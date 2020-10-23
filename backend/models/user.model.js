// Documentation by Andrew Glenn

// Schema to log into the database(?)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to retrieve the host machines set time
// Used in diet schema field to retrieve the last time information was recorded.
getCurrentDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// Schema to be used in the Database to insert inputted data to tables
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    signUpDate: {
        type: Date,
        default: Date.now(),
    },
    age: {
        type: Number,
        default: 20,
    },
    weight: {
        type: Number,
        default: 150,
    },
    height: {
        type: Number,
        default: 66,
    },
    gender: {
        type: String,
        default: "Non-Binary",
    },
    activityLevel: {
        type: String,
        default: "Sedentary",
    },
    race: {
        type: String,
        default: "Unknown",
    },
    major: {
        type: String,
        default: "Undeclared",
        minlength: 3,
    },
    foodHistory: {
        type: Array,
        default: [],
    },
    diet: {
        type: Object,
        default: {
            total: 1,
            fat: 1,
            carbohydrates: 1,
            protein: 1,
            lastCalculated: getCurrentDay(),
        },
        required: true,
    },
},);

// Turns the inputted schema data into a model to be exported to the database
const User = mongoose.model('User', userSchema);
module.exports = User;
