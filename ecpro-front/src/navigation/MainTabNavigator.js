import React from 'react';
import { TouchableOpacity, Image, Dimensions, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HeaderSearchBar } from '../components'
import TabBarScreen from '../screens/TabBarScreen';
import HomeScreen from '../screens/HomeScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchByCategory from '../screens/SearchByCategory';
import SearchScreen from '../screens/SearchScreen';
import CrmScreen from '../screens/CrmScreen';
import HomeCrmScreen from '../screens/HomeCrmScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CategoryCrmScreen from '../screens/CategoryCrmScreen';
import UsersCrmScreen from '../screens/UsersCrmScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import OrderCrmScreen from '../screens/OrderCrmScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const role = useSelector(state => state.auth.role);
    // console.log(role)
    Fontisto.loadFont();
    return (
        <Tab.Navigator
            tabBar={props => <TabBarScreen {...props} />}
            initialRouteName='Home'
        >
            <Tab.Screen
                name='Profile'
                component={ProfileNav}
                options={{ tabBarLabel: 'user' }}
            />
            <Tab.Screen
                name='ShoppingCart'
                component={ShoppingNav}
                options={{
                    tabBarLabel: role.includes("ROLE_ADMIN") ? 'customerservice' : 'shoppingcart'
                }}
            />
            <Tab.Screen
                name='Category'
                component={CategoryNav}
                options={{ tabBarLabel: 'appstore-o' }}
            />
            <Tab.Screen
                name='Home'
                component={HomeNav}
                options={{ tabBarLabel: 'home' }}
            />
        </Tab.Navigator>
    )
}

const ProfileNav = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerTitle: (<HeaderSearchBar />),
                    headerTitleStyle: { alignSelf: 'center' },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchBarScreen')}
                            style={{ paddingRight: 15 }}
                        >
                            <AntDesign name='search1' size={26} color={'#000'} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => alert('This is a button!')}
                            style={{ paddingLeft: 20 }}
                        >
                            <Fontisto name="bell" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

const ShoppingNav = (props) => {
    const role = useSelector(state => state.auth.role);
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            {
                !role.includes("ROLE_ADMIN")
                    ?
                    <Stack.Screen
                        name="ShoppingCartScreen"
                        component={ShoppingCartScreen}
                        options={{
                            headerTitle: 'سبد خرید',
                            headerLeft: null,
                            animationEnabled: false,
                            headerStyle: {
                                shadowColor: 'transparent',
                                elevation: 0,
                            }
                        }}
                    />
                    :
                    <Stack.Screen
                        name="CrmScreen"
                        component={CrmScreen}
                        options={{
                            headerTitle: (<HeaderSearchBar />),
                            headerTitleStyle: { alignSelf: 'center' },
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SearchBarScreen')}
                                    style={{ paddingRight: 15 }}
                                >
                                    <AntDesign name='search1' size={26} color={'#000'} />
                                </TouchableOpacity>
                            ),
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => alert('This is a button!')}
                                    style={{ paddingLeft: 15 }}
                                >
                                    <Fontisto name="bell" size={26} color="black" />
                                </TouchableOpacity>
                            ),
                        }}
                    />
            }
            <Stack.Screen
                name="HomeCrmScreen"
                component={HomeCrmScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="AddProductScreen"
                component={AddProductScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="CategoryCrmScreen"
                component={CategoryCrmScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="UsersCrmScreen"
                component={UsersCrmScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="UserDetailsScreen"
                component={UserDetailsScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="OrderCrmScreen"
                component={OrderCrmScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
            <Stack.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={{
                    headerTitle: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CrmScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: '',
                    headerTitleStyle: { alignSelf: 'center' },
                }}
            />
        </Stack.Navigator>
    )
}

const CategoryNav = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="CategoryScreen">
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    headerTitle: (<HeaderSearchBar />),
                    headerTitleStyle: { alignSelf: 'center' },
                    headerTransparent: false,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchBarScreen')}
                            style={{ paddingRight: 20 }}
                        >
                            <AntDesign name='search1' size={26} color={'#000'} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => alert('This is a button!')}
                            style={{ paddingLeft: 20 }}
                        >
                            <Fontisto name="bell" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="SearchByCategory"
                component={SearchByCategory}
                options={{
                    headerTitle: (<HeaderSearchBar />),
                    headerTitleStyle: { alignSelf: 'center' },
                    headerTransparent: false,
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.navigate('CategoryScreen')}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchBarScreen')}
                            style={{ paddingLeft: 20 }}
                        >
                            <AntDesign name='search1' size={26} color={'#000'} />
                        </TouchableOpacity>
                    ),
                }}
            />

        </Stack.Navigator>
    )
}

const HomeNav = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: (<HeaderSearchBar />),
                    headerTitleStyle: { alignSelf: 'center' },
                    headerTransparent: false,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchBarScreen')}
                            style={{ paddingRight: 20 }}
                        >
                            <AntDesign name='search1' size={26} color={'#000'} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => alert('This is a button!')}
                            style={{ paddingLeft: 20 }}
                        >
                            <Fontisto name="bell" size={26} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerTitle: (<HeaderSearchBar />),
                    headerTitleStyle: { alignSelf: 'center', left: 20 },
                    headerLeft: '',
                    headerRight: () => (
                        <TouchableOpacity style={{ right: 20 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" color="black" size={25} style={{ transform: [{ scaleX: -1 }] }} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default MainTabNavigator;