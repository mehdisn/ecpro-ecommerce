import {
    GET_ADDRESSES,
    GET_SELECTED_ADDRESS,
    CREATE_ORDER
} from '../common/Constants';

const INITIAL_STATE = {
    addresses: [],
    count: 0,
    selectedAddress: [],
    order: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ADDRESSES:
            return { ...state, addresses: action.payload, count: action.payload.length }
        case GET_SELECTED_ADDRESS:
            return { ...state, selectedAddress: action.payload }
        case CREATE_ORDER:
            return { ...state, order: action.payload }
        default:
            return state
    }
}