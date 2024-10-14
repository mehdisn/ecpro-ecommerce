import React from 'react';
import { SafeAreaView, Image, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

const LoadingScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/images/ava_text.png')}
                    style={{ width: SCREEN_WIDTH * 1.2, resizeMode: 'contain' }}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color='#4B8C2B'
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#4E57D9',
        backgroundColor: 'white',
    }
})

export default LoadingScreen;