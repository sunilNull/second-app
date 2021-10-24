import React, { useState } from 'react'
import { TouchableWithoutFeedback, View, Text, Button, Keyboard, Alert } from 'react-native';
import styles from './styles';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import MyInput from '../components/MyInput';
import NumberContainer from '../components/NumberContainer';
import MyButton from '../components/MyButton';
const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();
    const [isNumberConfirmed, setIsNumberConfirmed] = useState(false);
    const validateEnteredNumber = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredNumber('');
        setIsNumberConfirmed(false);
    }
    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredNumber);
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert(
                "Invalid Number!",
                "Number Must be between 1 to 99",
                [{ text: "okay", style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }
        setIsNumberConfirmed(true);
        setSelectedNumber(choosenNumber);
        setEnteredNumber('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (isNumberConfirmed) {
        confirmedOutput = <Card style={styles.summeryNote}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MyButton onPress={() => {props.onGameStart(selectedNumber)}}>{"START GAME"}</MyButton>
                {/* <Button title="START GAME"/> */}
            </Card>;
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <MyInput value={enteredNumber} onChangeText={validateEnteredNumber} style={styles.input} keyboardType="number-pad" maxLength={2} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default StartGameScreen;
