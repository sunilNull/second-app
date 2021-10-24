import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import MyButton from '../components/MyButton'
import Colors from '../constants/Colors'

let gameOverImage= require('../assets/success.png')

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={gameOverImage} />
            </View>
            <Text style={styles.bodyText}>
                Your phone needed<Text style={styles.highlight}> {props.guessRound} </Text>
                 rounds to guess the number <Text style={styles.highlight}>{props.selectedNum}</Text>
            </Text>
            <MyButton onPress={props.onNewGameStart}>{"NEW GAME"}</MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 30,
        color: Colors.accent
    },
    imageContainer: {
        marginVertical: 30,
        width: 350,
        height: 350,
        borderRadius: 350 / 2,
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: "100%"
    },
    bodyText: {
        fontFamily: 'open-sans-bold',
        paddingVertical: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 22
    },
    highlight: {
        color: Colors.primary
    }
})


export default GameOverScreen;
