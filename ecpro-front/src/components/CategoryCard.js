import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { API_BASE_URL } from '../common/Constants';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height
const Width = WINDOW_HEIGHT * 0.09
export function CategoryCard(props) {
    return (
        <TouchableOpacity
            style={[styles.container, props.containerStyle]}
            onPress={props.onPress}
            {...props}
        >
            <View style={{ flex: 3 }}>
                <Image
                    source={{ uri: API_BASE_URL + `/${props.image}` }}
                    style={styles.image}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', top: 8 }} >
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4FAFE',
        height: Width,
        width: Width * 1.1,
        marginLeft: 20,
        top: 20,
        borderRadius: 17,
        transform: [{ scaleX: -1 }]
    },
    text: {
        color: 'black',
        fontSize: 11,
        top: 10
    },
    image: {
        opacity: 0.8,
        borderRadius: 3,
        resizeMode: 'center',
        flex: 1,
        width: null,
        height: null,
        top: Width * 1 / 8
    }

});