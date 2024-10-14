import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { RatingStars } from './RatingStars';
const WINDOW_WIDTH = Dimensions.get('window').width;
import { API_BASE_URL } from '../common/Constants';
export function Card(props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
            {...props}
        >
            <View style={{ flex: 3 }}>
                <Image
                    source={{ uri: API_BASE_URL + `/${props.image}` }}
                    style={styles.image}
                />
            </View>
            <View style={{ width: WINDOW_WIDTH * 0.45, height: WINDOW_WIDTH * 0.2 }} >
                <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        // height: WINDOW_WIDTH * 0.6,
        // width: WINDOW_WIDTH * 0.45,
        marginLeft: 20,
        top: 20,
        transform: [{ scaleX: -1 }]
    },
    text: {
        color: 'black',
        fontSize: 12.6,
        top: 6
    },
    image: {
        opacity: 0.8,
        borderRadius: 3,
        resizeMode: 'cover',
        flex: 1,
        width: WINDOW_WIDTH * 0.45,
        height: WINDOW_WIDTH * 0.45
    }

});