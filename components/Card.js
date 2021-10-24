import React from 'react'
import { View, StyleSheet } from 'react-native'
const Card = porps => {
    return (
        <View style={{...styles.card, ...porps.style}}>
            {porps.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8
    }
});

export default Card;
