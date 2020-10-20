import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));

export default class OpeningPage extends Component {
    constructor(props) {
        super(props);
    }

    /* Creates the background image for the app, display message, link to
        the LoginPage, link to the SignupPage, and link to not having an account.*/
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoText}>
                            Welcome to Food Connection
                        </Text>
                    </View>
                    <View style={styles.buttonContainerAlt}>
                        <Button onPress={() =>
                            this.props.navigation.navigate("Login Page")} title="Login" style={styles.button} />
                            <Text></Text>
                        <Button onPress={() =>
                            this.props.navigation.navigate("Signup Page")} title="Sign up" style={styles.button} />
                            <Text></Text>
                        <Text style={styles.buttonText}>Don't have an account?</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}



