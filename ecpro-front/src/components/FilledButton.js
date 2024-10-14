import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function FilledButton(props) {

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}
      {...props}
    >
      {
        props.logo ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name={props.logoName} size={props.logoSize ? props.logoSize : 22} color={props.logoColor ? props.logoColor : '#fff'} />
          </View>
          :
          props.ActivityIndicator ?
            <ActivityIndicator
              size='small'
            />
            :
            <Text style={[styles.text, props.textStyle]}>{props.title.toUpperCase()}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#171A40'
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});