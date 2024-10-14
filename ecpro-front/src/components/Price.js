import React from 'react';
import { StyleSheet, Text, View, Dimensions, Input } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height

const numberFormat = (value) =>
    new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
    }).format(value);

export function Price(props) {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <Text
                style={[styles.text, props.textStyle]}
            >
                {numberFormat(props.number).split("٫۰۰").slice()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
    },
    image: {
        resizeMode: 'stretch',
        flex: 1,
        width: WINDOW_WIDTH * 0.4
    }

});