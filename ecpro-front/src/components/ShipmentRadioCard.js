import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
export function ShipmentRadioCard(props) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
            <View style={{ width: WINDOW_WIDTH * 0.8 }}>
                <Text style={{ textAlign: 'right', fontSize: WINDOW_WIDTH * 0.043, fontWeight: '400' }} numberOfLines={2}>{props.method}</Text>
                <View style={{ width: '100%', top: WINDOW_WIDTH * 0.03, justifyContent: 'flex-end' }}>
                    <Text style={styles.text}>{props.Text}</Text>
                </View>
            </View>
            <View style={[{
                height: WINDOW_WIDTH * 0.055,
                width: WINDOW_WIDTH * 0.055,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: props.selected ? '#00B4CE' : '#C7C9CC',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: WINDOW_WIDTH * 0.025,
                            width: WINDOW_WIDTH * 0.025,
                            borderRadius: 6,
                            backgroundColor: props.selected ? '#00B4CE' : '#C7C9CC',
                        }} />
                        : null
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'right',
        color: '#555758'
    },
    container: {
        width: '100%',
        height: WINDOW_WIDTH * 0.2,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    }
});