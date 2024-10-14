import React from 'react';
import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import transform from 'css-to-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

export function HeaderSearchBar({ title, style, onPress }) {
    Feather.loadFont();
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/ava_text.png')}
                style={{ width: SLIDER_WIDTH * 0.6, resizeMode: 'contain', height: SLIDER_HEIGHT * 0.07 }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black'
    }
});