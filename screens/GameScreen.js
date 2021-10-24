import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import MyButton from '../components/MyButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/Colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        generateRandomBetween(min, max, exclude);
    }
    else {
        return randNum;
    }
};

const renderListItem = (numOfRounds, item) => (
    <View style={styles.pastGuessTextView} key={numOfRounds-item.index}>
        <Text style={styles.pastGuessText}>#{numOfRounds - item.index}</Text>
        <Text style={styles.pastGuessText}>{item.item}</Text>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [rounds, setRounds] = useState(0);

    const { userChoice, onGameOver } = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess,])

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = direction => {
        if (
            (direction === 'LOWER' && currentGuess < props.userChoice) ||
            (direction === 'GREATER' && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                "Hmmm!",
                "Dont try to cheat on Computer, okay..",
                [{ text: "Right", style: "cancel" }]
            );
            return;
        }
        if (direction === 'LOWER') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        setPastGuesses(myCurrentPastGuesses => [nextGuess.toString(), ...myCurrentPastGuesses]);
    };
    return (
        <View style={styles.screen}>
            <Text>Oppnent`s Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MyButton onPress={nextGuessHandler.bind(this, 'LOWER')}>
                    <Ionicons name="md-remove" size={24} />
                </MyButton>
                <MyButton onPress={nextGuessHandler.bind(this, 'GREATER')}>
                    <Ionicons name="md-add" size={24} />
                </MyButton>
            </Card>
            <View style={styles.pastGuessesContainer}>
                <FlatList
                    keyExtractor={item => item}
                    contentContainerStyle={styles.pastGuessesList}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
                {/* <ScrollView contentContainerStyle={styles.pastGuessesList}>
                    {pastGuesses.map((pastGuess, index) => renderListItem(pastGuess, pastGuesses.length - index))}
                </ScrollView> */}
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '80%'
    },
    pastGuessesContainer: {
        flex: 1,
        marginTop: 20,
        width: '80%',
    },
    pastGuessesList: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    pastGuessTextView: {
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10,
        backgroundColor: 'white',
        padding: 15,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pastGuessText: {
        paddingHorizontal: 20,
        fontFamily: "open-sans-bold",
        color: "white",
        fontSize: 20,
        textShadowColor: 'red',
        textShadowOffset: {width:0, height: 0},
        textShadowRadius: 5
    }
})
