import React, { useEffect } from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import { bootstrapAsync } from '../actions/AuthActions';

const AppNavigator = (props) => {
    const Stack = createStackNavigator();
    const accessToken = useSelector(state => state.auth.token);
    const loading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch()

    useEffect(() => {
        const bootStrap = async () => {
            await dispatch(bootstrapAsync());
        }
        bootStrap();
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {loading === true ?
                    <Stack.Screen
                        name='LoadingScreen'
                        component={LoadingScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    :
                    accessToken === null ? (
                        <Stack.Screen
                            name='authStack'
                            component={AuthStackNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                    ) : (
                            <Stack.Screen
                                name='mainStack'
                                component={MainStackNavigator}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;