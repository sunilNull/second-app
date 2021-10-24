import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

const App = () => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedNum, setSelectedNum] = useState();
    const [guessRound, setGuessRound] = useState(0);

    if (!isDataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setIsDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    const ConfigureNewGameHandler = () => {
        setGuessRound(0);
        setSelectedNum(0);
    }
    const StartGameHandler = userNum => {
        setSelectedNum(userNum);
        setGuessRound(0);
    }
    const GameOverHandler = numOfRound => {
        setGuessRound(numOfRound)
    };
    let content = <StartGameScreen onGameStart={StartGameHandler} />;
    if (selectedNum && guessRound <= 0) {
        content = <GameScreen userChoice={selectedNum} onGameOver={GameOverHandler} />;
    }
    else if (guessRound > 0) {
        content = <GameOverScreen onNewGameStart={ConfigureNewGameHandler} guessRound={guessRound} selectedNum={selectedNum} />;
    }
    return (
        <View style={styles.screen}>
            <Header title="Guess a Number" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
        // fontFamily: 'open-sans'
    },
});

export default App;