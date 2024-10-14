import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { TextButton } from './TextButton';
import Persian from 'persian';
const WINDOW_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
export function AddressRadioCard(props) {
    MaterialCommunityIcons.loadFont();
    Fontisto.loadFont();
    const address = props.address;
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={{ width: WINDOW_WIDTH * 0.8 }}>
                <Text style={{ textAlign: 'right', fontSize: WINDOW_WIDTH * 0.043, fontWeight: 'bold' }} numberOfLines={2}>{address.address}</Text>
                <View style={{ width: '100%', top: WINDOW_WIDTH * 0.05, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={styles.textAddress}>{address.city}</Text>
                        <Text>   </Text>
                        <MaterialCommunityIcons name="city-variant-outline" size={22} color="#555758" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5 }}>
                        <Text style={styles.textAddress}>{Persian.toPersian(address.zipCode)}</Text>
                        <Text>   </Text>
                        <Fontisto name="email" size={22} color="#555758" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5 }}>
                        <Text style={styles.textAddress}>{Persian.toPersian(address.phoneNumber)}</Text>
                        <Text>   </Text>
                        <AntDesign name="phone" size={22} color="#555758" />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={styles.textAddress}>{address.lastName}</Text>
                        <Text> </Text>
                        <Text style={styles.textAddress}>{address.firstName}</Text>
                        <Text>   </Text>
                        <AntDesign name="user" size={22} color="#555758" />
                    </View>
                    <TextButton
                        title='حذف آدرس'
                        textStyle={{ fontSize: WINDOW_WIDTH * 0.035, color: '#F30B27' }}
                        style={{ alignItems: 'flex-end', top: WINDOW_WIDTH * 0.05 }}
                        onPress={props.deleteOnPress}
                    />
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
    textAddress: {
        textAlign: 'right',
        color: '#555758'
    },
    container: {
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH * 0.6,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    }
});