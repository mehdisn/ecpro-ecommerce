import React from 'react';
import {StyleSheet, View} from 'react-native';

export function HorizontalLine({style, ...props}) {
  return (
    <View
      {...props}
      style={[styles.horizontalLine, style]}
    />
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: 1,
  },
});