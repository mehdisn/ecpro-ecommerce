import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Dimensions, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Text } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

import {
    HorizontalLine,
    ErrorModal,
    Input,
    TextButton,
    FilledButton,
    LogoImage
} from '../components';
import { signIn, clear_error } from '../actions/AuthActions';

const SignInScreen = (props) => {
    const [input, setInput] = useState('');
    const [Password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const error = useSelector(state => state.auth.error_message);

    const InputChange = (text) => {
        setInput(text);
        props.clear_error();
    }
    const ClearInputs = () => {
        setInput('');
        setPassword('');
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <View style={{ alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.6 }}>
                <LogoImage
                    source={require('../assets/images/ava_text.png')}
                    style={{ width: SCREEN_WIDTH * 1.2, resizeMode: 'contain', bottom: SCREEN_WIDTH * 0.05 }}
                />
            </View>

            {error != '' ? (
                <View style={{ width: SCREEN_WIDTH * 0.8 }}>
                    <Text style={{ textAlign: 'right', color: 'red' }}>{error === "Invalid password!" ? "رمز عبور اشتباه است" : error}</Text>
                </View>
            ) : (
                    null
                )
            }
            <Input
                style={styles.input}
                placeholder={'شماره موبایل یا پست الکترونیک'}
                value={input}
                onChangeText={text => InputChange(text)}
            />
            <Input
                style={styles.input}
                placeholder={'کلمه عبور خود را وارد نمایید'}
                secureTextEntry={true}
                value={Password}
                onChangeText={(text) => {
                    setPassword(text);
                    props.clear_error();
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => Keyboard.dismiss()}
            />
            {
                Loading ?
                    <FilledButton
                        ActivityIndicator
                        containerStyle={[styles.loginButton, { backgroundColor: '#171A40' }]}
                    />
                    :
                    <FilledButton
                        title={'ورود به فروشگاه'}
                        containerStyle={[styles.loginButton, { backgroundColor: !Boolean(input && Password) ? 'gray' : '#171A40' }]}
                        disabled={!Boolean(input && Password)}
                        onPress={() => {
                            setLoading(true);
                            props.signIn({ input: input, password: Password });
                            ClearInputs();
                            setLoading(false);
                        }}
                    />
            }
            <TextButton
                title={'ایجاد حساب کاربری جدید'}
                onPress={() => { props.navigation.navigate("SignUp"); props.clear_error(); }}
            />

            <HorizontalLine
                style={styles.horizontalLine}
            />

            <Text style={styles.text}>
                با ورود و یا ثبت نام شما شرایط و قوانین استفاده از سرویس های فروشگاه را می پذیرید
            </Text>

            {error != '' ? (
                <>
                    <ErrorModal
                        error={error}
                    />
                </>
            ) : (
                    null
                )
            }

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SCREEN_WIDTH * 0.08,
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 3
    },
    input: {
        marginVertical: 8,
        textAlign: 'right',
    },
    loginButton: {
        marginVertical: 40,
    },
    text: {
        color: '#5c5c5c',
        textAlign: 'center'
    },
    horizontalLine: {
        borderBottomColor: '#d1d1d1',
        marginVertical: 20,
    }
});

export default connect(null, { signIn, clear_error })(SignInScreen);