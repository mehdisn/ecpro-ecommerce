import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ProductScreen from '../screens/ProductScreen';
import CommentsScreen from '../screens/CommentsScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import MainTabNavigator from './MainTabNavigator';
import AddAddressScreen from '../screens/AddAddressScreen';
import SelectAddressScreen from '../screens/SelectAddressScreen';
import ShipmentScreen from '../screens/ShipmentScreen';
import OrderCompeleteScreen from '../screens/OrderCompeleteScreen';
import SearchBarScreen from '../screens/SearchBarScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MainStack = () => {
    const Stack = createStackNavigator()
    const navigation = useNavigation();
    const commentCount = useSelector(state => state.product.commentCount);
    Ionicons.loadFont();
    MaterialCommunityIcons.loadFont();
    FontAwesome.loadFont();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={MainTabNavigator}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    headerTransparent: false,
                    headerTitle: "",
                    animationEnabled: false,
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.5, left: 10 }}>
                            <MaterialCommunityIcons name="dots-vertical" color="black" size={25} style={{}} />
                            <FontAwesome name="heart-o" color="black" size={23} style={{ paddingRight: 20, paddingLeft: 20 }} />
                            <Ionicons name="cart-outline" color="black" size={25} style={{}} />
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="commentsScreen"
                component={CommentsScreen}
                options={{
                    headerShown: true,
                    headerTitle: commentCount + ' دیدگاه',
                    animationEnabled: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" color="black" size={25} style={{ right: 20, transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.5, left: 10 }}>
                            <MaterialCommunityIcons name="sort-ascending" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="addCommentScreen"
                component={AddCommentScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'ثبت دیدگاه',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="CheckOutScreen"
                component={CheckOutScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'مشاهده ی جزییات',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="AddAddressScreen"
                component={AddAddressScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'افزودن آدرس',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="SelectAddressScreen"
                component={SelectAddressScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'انتخاب آدرس',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="ShipmentScreen"
                component={ShipmentScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'روش پرداخت',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ right: 20, transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="OrderCompeleteScreen"
                component={OrderCompeleteScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    animationEnabled: false,
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Ionicons name="close" color="black" size={25} style={{ right: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="SearchBarScreen"
                component={SearchBarScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    animationEnabled: false,
                    headerTransparent: true,
                    headerStyle: {
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                    headerRight: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'HomeScreen' })}>
                            <Ionicons name="close" color="black" size={25} style={{ left: 20 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

        </Stack.Navigator>
    )
}

export default MainStack;