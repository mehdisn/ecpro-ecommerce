import {
    GET_ADDRESSES,
    ADD_ERROR,
    GET_SELECTED_ADDRESS,
    CREATE_ORDER
} from '../common/Constants';
import AsyncStorage from '@react-native-community/async-storage'

import {
    getAddresses,
    addAddress,
    deleteAddress,
    getSelectedAddress,
    setSelectedAddress,
    createOrder
} from '../common/Api'

export const getAddress = () => async dispatch => {
    getAddresses().then(async addresses => {
        dispatch({ type: GET_ADDRESSES, payload: addresses })
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const _addAddress = ({ firstName, lastName, city, address, zipCode, phoneNumber }) => async dispatch => {
    addAddress({ firstName, lastName, city, address, zipCode, phoneNumber }).then(async addresses => {
        dispatch({ type: GET_ADDRESSES, payload: addresses });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const _deleteAddress = (addressId) => async dispatch => {
    deleteAddress(addressId).then(addresses => {
        dispatch({ type: GET_ADDRESSES, payload: addresses });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const _getSelectedAddress = () => async dispatch => {
    getSelectedAddress().then(address => {
        dispatch({ type: GET_SELECTED_ADDRESS, payload: address });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const _setSelectedAddress = (addressId) => async dispatch => {
    setSelectedAddress(addressId).then(address => {
        dispatch({ type: GET_SELECTED_ADDRESS, payload: address });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const _createOrder = ({ addressId, navigation }) => async dispatch => {
    createOrder({ addressId: addressId }).then(order => {
        dispatch({ type: CREATE_ORDER, payload: order });
        navigation.navigate('OrderCompeleteScreen')
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}