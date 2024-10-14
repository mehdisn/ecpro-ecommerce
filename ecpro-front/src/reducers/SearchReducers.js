import {
    SEARCH_PRODUCTS,
    ADD_ERROR
} from '../common/Constants';

const INITIAL_STATE = {
    products: [],
    error_message: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            return { ...state, products: action.payload }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state;
    }
}