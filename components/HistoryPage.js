import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity, StatusBar } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import styles from './frontendstyle';

const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

class HistoryPage extends Component {
    constructor(props) {
        super(props);
    }

    /* ??? Shows the history of foods that have been looked up, and creates the background
    and styling for the page.*/
    FoodItem = ({ food }) => {
        return (
            <View style = {styles.foodItem1}>   
            <Text style = {styles.Healthscore}>{food.healthScore} - {food.name}</Text>
               </View> 
                );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style= {styles.backgroundImage} source= {image}>
                <StatusBar barStyle="light-content"/>
                <Text style={{width:'100%', paddingTop:40,paddingBottom:15,backgroundColor:'lightgreen',justifyContent:'center',fontSize:20,textAlign:'center'}}>History </Text>
                <FlatList
                    style={{width: '100%'}}
                    data = { this.props.user.foodHistory }
                    renderItem = {({ item }) => (
                    <View style = {styles.row}>
                    <this.FoodItem food = {item.food}/>
                    </View>
                    )}
                    keyExtractor = {item => item.time.toString() }
                    
                        
                />
            </ImageBackground>
            </View>
        );
    }
}


/* Creates a constant for users and foods and maps them to a state, which then returns the
state of the user and foods constants.*/
const mapStateToProps = (state) => {
    const { user, foods } = state;
    return { user, foods };
};

export default connect(mapStateToProps)(HistoryPage);
