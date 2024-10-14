import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function TouchableButton(props) {
    MaterialIcons.loadFont();
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.navButtons, props.containerStyle]} onPress={props.onPress}>
            <Ionicons name="ios-arrow-back" size={20} color="gray" />
            <Text style={[styles.text]}> {props.title} </Text>
            {
                props.rightIcon
                    ?
                    <MaterialIcons name={props.rightIconName} size={25} style={{ bottom: 2, left: 3 }} />
                    :
                    null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: -15,
    },
    text: {
        paddingLeft: 180,
        fontSize: 16,
        textAlign: 'right',
    },
    navButtons: {
        flexDirection: "row",
        marginTop: 32
    },
});