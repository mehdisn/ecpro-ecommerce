import {
    GET_CART,
    ADD_ERROR
} from '../common/Constants';

const INITIAL_STATE = {
    products: [],
    itemsCount: 0,
    total: 0,
    outOfStock: [],
    priceChanged: [],
    error_message: '', 
    Loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CART:
            return { ...state, products: action.Items, itemsCount: action.itemsCount, total: action.total, outOfStock: action.outOfStock, priceChanged: action.priceChanged }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state
    }
}