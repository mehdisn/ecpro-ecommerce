import React from 'react';
import {StyleSheet, Image} from 'react-native';

export function LogoImage({style, ...props}) {
  return (
    <Image
      {...props}
      style={[styles.Image, style]}
    />
  );
}

const styles = StyleSheet.create({
});