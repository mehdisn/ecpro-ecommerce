/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'Require cycle: node_modules/react-native-popup-dialog/dist/type.js',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
  'Failed child context type: Invalid child context `virtualizedCell.cellKey`'
])

import store from './src/store'
import AppNavigator from './src/navigation/AppNavigator';

import 'intl';
import 'intl/locale-data/jsonp/fr';

const customTextProps = {
  style: {
    fontFamily: 'IRANSans'
  }
};

const App: () => React$Node = () => {
  setCustomText(customTextProps);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
