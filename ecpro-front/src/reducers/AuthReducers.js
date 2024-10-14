import {
    SIGNIN,
    ADD_AUTH_ERROR,
    CLEAR_ERROR,
    RESTORE_TOKEN,
    SIGNOUT,
    MODAL_VISIBLE,
    OTP,
    VERIFY_OTP,
    RESET_CODE_SENT
} from '../common/Constants';

const INITIAL_STATE = {
    error_message: '',
    token: null,
    isSignout: false,
    isLoading: true,
    modalVisible: true,
    phoneNumber: '',
    email: '',
    password: '',
    secret: '',
    codeSent: false,
    role: [],
    fullName: '',
    Loading: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload)
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...state,
                token: action.payload,
                phoneNumber: action.user.phonenumber,
                role: action.user.roles,
                fullName: action.user.fullname,
                isLoading: false
            }
        case ADD_AUTH_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        case SIGNIN:
            return {
                error_message: '',
                token: action.payload.accessToken,
                isSignout: false,
                phoneNumber: action.payload.phonenumber,
                role: action.payload.roles,
                fullName: action.payload.fullname
            }
        case CLEAR_ERROR:
            return { ...state, error_message: '' }
        case SIGNOUT:
            return { ...state, token: null, isSignout: true }
        case MODAL_VISIBLE:
            return { ...state, modalVisible: action.payload }
        case OTP:
            return {
                ...state,
                fullName: action.fullName,
                phoneNumber: action.phoneNumber,
                secret: action.secret,
                email: action.email,
                password: action.password,
                codeSent: true
            }
        case VERIFY_OTP:
            return { ...state, secret: '', password: '', codeSent: false }
        case RESET_CODE_SENT:
            return { ...state, codeSent: false }
        default:
            return state;
    }
}