import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingCart } from '../actions/CartActions';
const WINDOW_WIDTH = Dimensions.get('window').width;
function TabBarScreen(props) {
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);
  const [admin, setAdmin] = useState(role.includes("ROLE_ADMIN"));
  const { state, descriptors, navigation } = props;
  AntDesign.loadFont();

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.View}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }

          if (index === 1) {
            !admin
              ?
              dispatch(getShoppingCart())
              :
              navigation.navigate('ShoppingCart', {
                screen: 'CrmScreen'
              })
          }
          if (index === 2) {
            navigation.navigate('Category', {
              screen: 'CategoryScreen'
            })
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const buttonColor = () => {
          if (isFocused) {
            return "#A1ED82"
          } else {
            return "#737373"
          }
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={!isFocused ? styles.button : styles.focusedButton}
            key={index}
          >
            <AntDesign name={label} size={25} color={buttonColor()} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    flexDirection: 'row',
    backgroundColor: '#171A40',
    padding: 10,
    shadowColor: '#6a6a6a',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    height: 70,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 0.15
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1.5,
      height: 1.5
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  }
})

export default TabBarScreen;