import AsyncStorage from '@react-native-community/async-storage';
import { login, signup, otpgen, bootstrap } from '../common/Api';

import {
    MODAL_VISIBLE,
    SIGNIN,
    ACCESS_TOKEN,
    SIGNOUT,
    ADD_AUTH_ERROR,
    CLEAR_ERROR,
    RESTORE_TOKEN,
    OTP,
    VERIFY_OTP,
    RESET_CODE_SENT
} from '../common/Constants';

export const signIn = ({ input, password }) => async dispatch => {
    login({ input: input, password: password }).then(async response => {
        await AsyncStorage.setItem(ACCESS_TOKEN, response.accessToken);
        dispatch({ type: SIGNIN, payload: response });
    }).catch(err => {
        dispatch({ type: ADD_AUTH_ERROR, payload: err.message });
    });
}

export const otpGen = ({ fullName, phoneNumber, email, password }) => async dispatch => {
    otpgen({ phonenumber: phoneNumber, email: email }).then(response => {
        if (response) {
            dispatch({ type: OTP, fullName, phoneNumber, secret: response.secret, email, password });
        } else {
            dispatch({ type: ADD_AUTH_ERROR, payload: response.message });
        }
    }).catch(err => {
        dispatch({ type: ADD_AUTH_ERROR, payload: err.message });
    });
}

export const signUp = ({ fullName, email, PhoneNumber, password, token, secret, navigation }) => async dispatch => {
    signup({ fullname: fullName, email: email, phonenumber: PhoneNumber, password: password, token, secret }).then(async response => {
        await AsyncStorage.setItem(ACCESS_TOKEN, response.accessToken);
        dispatch({ type: SIGNIN, payload: response });
        dispatch({ type: VERIFY_OTP })
    }).catch(err => {
        console.log(err)
        dispatch({ type: ADD_AUTH_ERROR, payload: err.message });
    });
}

export const signOut = () => async dispatch => {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    dispatch({ type: SIGNOUT });
}

export const bootstrapAsync = () => async dispatch => {
    const user = {
        phoneNumber: null,
        role: null,
        fullName: null
    }
    try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (token) {
            bootstrap().then(res => {
                dispatch({ type: RESTORE_TOKEN, payload: token, user: res });
            }).catch(async err => {
                await AsyncStorage.removeItem(ACCESS_TOKEN);
                dispatch({ type: RESTORE_TOKEN, payload: null, user: user });
            })
        } else {
            dispatch({ type: RESTORE_TOKEN, payload: token, user: user });
        }
    } catch (err) {
        alert(err.message);
        console.log(err);
        dispatch({ type: ADD_AUTH_ERROR, payload: err.message });
    }
}

export const clear_error = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const showModal = () => async dispatch => {
    dispatch({ type: MODAL_VISIBLE, payload: true });
    setTimeout(() => {
        dispatch({ type: MODAL_VISIBLE, payload: false });
    }, 5000);
}

export const resetCodeSent = () => {
    return {
        type: RESET_CODE_SENT
    }
}