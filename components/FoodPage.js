import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

class FoodPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.textContainer}>
                    <Text style={styles.restaurantStyle}>
                        {this.props.global.selectedFood.restaurant.name} - {this.props.global.selectedFood.restaurant.location}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        {this.props.global.selectedFood.name} - ${this.props.global.selectedFood.price}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Calories: {this.props.global.selectedFood.calories}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>
                        Fat: {this.props.global.selectedFood.fat}g
                    </Text>
                    <Text style={styles.textStyle}>
                        Carbs: {this.props.global.selectedFood.carbs}g
                    </Text>
                    <Text style={styles.textStyle}>
                        Protein: {this.props.global.selectedFood.protein}g
                    </Text>
                </View>
                <View style={styles.buttonContainer1}>
                    <Button color="#CC5CFF" onPress={() => {
                        this.props.logFood({id: this.props.global.selectedFood._id, time: Date.now()});
                    }} title="Log Food as Consumed" />
                </View>
                <View style={styles.buttonContainer2}>
                    <Button color="#11CC33" onPress={() => 
                        Linking.openURL(`https://maps.google.com/?q=` + this.props.global.selectedFood.restaurant.location)
                    } title="Click here to Navigate" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#AA6688',
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonContainer1: {
        marginTop: 60,
        width: 380,
    },
    buttonContainer2: {
        marginTop: 20,
        width: 380,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    navigateStyle: {
        marginTop: 40,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    restaurantStyle: {
        marginBottom: 40,
        padding: 10,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

const mapStateToProps = (state) => {
    const { global } = state;
    return { global };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logFood: (food) => {
            dispatch({
                type: "ADD_FOOD_TO_HISTORY",
                payload: food,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodPage);
