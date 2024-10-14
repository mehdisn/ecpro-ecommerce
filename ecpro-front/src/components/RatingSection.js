import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Dimensions, View } from 'react-native';
const SLIDER_WIDTH = Dimensions.get('window').width;

const setBackgroundColor = (rating) => {
    let backgroundColor;
    if (rating <= 2) backgroundColor = '#FABD02';
    else if (2 < rating < 4) backgroundColor = '#B1B74A';
    if (rating >= 4) backgroundColor = '#61A654';

    return backgroundColor;
}

export function RatingSection(props) {
    return (
        <View style={[styles.container, props.containerStyle, {backgroundColor: setBackgroundColor(props.rating)}]}>
            <Text style={[styles.text, props.textStyle]}>{props.rating}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: SLIDER_WIDTH * 0.06,
        width: SLIDER_WIDTH * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: SLIDER_WIDTH * 0.04,
        color: 'white',
    }
});