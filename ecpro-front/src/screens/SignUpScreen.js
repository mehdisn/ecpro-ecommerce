import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Dimensions } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Text } from 'react-native';
import VerifyOtpScreen from '../screens/VerifyOtpScreen'
const SCREEN_WIDTH = Dimensions.get('window').width;

import {
    HorizontalLine,
    ErrorModal,
    Input,
    TextButton,
    FilledButton,
    LogoImage
} from '../components';

import { clear_error, otpGen } from '../actions/AuthActions';

const SignUpScreen = (props) => {
    const [Email, setEmail] = useState('');
    const [FullName, setFullName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState('');
    const error = useSelector(state => state.auth.error_message);
    const [Err, setErr] = useState(0)
    const [EmailErr, setEmailErr] = useState(1)
    const [PasswordErr, setPasswordErr] = useState(1)

    const emailChange = (text) => {
        setEmail(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        reg.test(text) === false ? setEmailErr(0) : setEmailErr(1)
    }

    const phoneNumberChange = (text) => {
        setPhoneNumber(text);
        PhoneNumber.length != 10 ? setErr(0) : setErr(1)
    }

    const passwordChange = (text) => {
        setPassword(text);
        let reg = /^(?=.*[\d])(?=.*[A-Za-z])[\w!@#$%^&*]{6,}$/;
        reg.test(text) === false ? setPasswordErr(0) : setPasswordErr(1)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <View style={{ alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.4 }}>
                <LogoImage
                    source={require('../assets/images/ava_text.png')}
                    style={{ width: SCREEN_WIDTH * 1.2, resizeMode: 'contain' }}
                />
            </View>
            <Input
                style={styles.input}
                placeholder={'نام خود را وارد نمایید'}
                value={FullName}
                onChangeText={(text) => setFullName(text)}
            />
            <Input
                style={styles.input}
                placeholder={'شماره موبایل'}
                value={PhoneNumber}
                onChangeText={phoneNumberChange}
                keyboardType='number-pad'
            />
            {
                PhoneNumber.length === 11 || PhoneNumber.length === 0
                    ?
                    null
                    :
                    <Text style={{ width: SCREEN_WIDTH * 0.85, textAlign: 'right', color: 'red' }}>شماره موبایل وارد شده اشتباه است</Text>
            }
            <Input
                style={styles.input}
                placeholder={'پست الکترونیک'}
                keyboardType={'email-address'}
                value={Email}
                onChangeText={text => emailChange(text)}
                keyboardType='email-address'
            />
            {
                !EmailErr
                    ?
                    <Text style={{ width: SCREEN_WIDTH * 0.85, textAlign: 'right', color: 'red' }}>ایمیل وارد شده اشتباه است</Text>
                    :
                    null
            }
            <Input
                style={styles.input}
                placeholder={'کلمه عبور خود را وارد نمایید'}
                secureTextEntry={true}
                value={Password}
                onChangeText={(text) => passwordChange(text)}
            />
            {
                !PasswordErr
                    ?
                    <Text style={{ width: SCREEN_WIDTH * 0.85, textAlign: 'right', color: 'red' }}>طول کلمه ی عبور باید بیش از ۶ و دارای عدد و حروف باشد</Text>
                    :
                    null
            }
            <FilledButton
                title={'ایجاد حساب کاربری'}
                containerStyle={[styles.signUpButton, { backgroundColor: !Boolean(FullName && Email && PhoneNumber && Password && Err && EmailErr && PasswordErr) ? 'gray' : '#171A40' }]}
                disabled={!Boolean(FullName && Email && PhoneNumber && Password && Err && EmailErr && PasswordErr)}
                onPress={() => {
                    props.otpGen({ fullName: FullName, email: Email, password: Password, phoneNumber: PhoneNumber, navigation: props.navigation });
                }}
            />

            <TextButton
                title={'حساب کاربری دارید؟ وارد شوید'}
                onPress={() => { props.navigation.navigate("SignIn"); props.clear_error(); }}
            />

            <HorizontalLine
                style={styles.horizontalLine}
            />

            <Text style={styles.text}>
                با ورود و یا ثبت نام شما شرایط و قوانین استفاده از سرویس های فروشگاه را می پذیرید
            </Text>

            <VerifyOtpScreen />

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
        paddingHorizontal: SCREEN_WIDTH * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 3
    },
    input: {
        marginVertical: SCREEN_WIDTH * 0.02,
        textAlign: 'right'
    },
    signUpButton: {
        marginVertical: SCREEN_WIDTH * 0.04
    },
    text: {
        color: '#5c5c5c',
        textAlign: 'center'
    },
    horizontalLine: {
        borderBottomColor: '#c4c4c4',
        marginVertical: SCREEN_WIDTH * 0.03,
    }
});

export default connect(null, { otpGen, clear_error })(SignUpScreen);