import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';

const AuthStack = () => {
    const isSignout = useSelector(state => state.auth.isSignout);
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false,
                    animationTypeForReplace: isSignout ? 'push' : 'pop'
                }}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="VerifyOtp"
                component={VerifyOtpScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack;