import {
    GET_SLIDER_IMAGES,
    GET_HOME_CATEGORIES,
    GET_LIMITED_NEW_PRODUCTS,
    GET_BEST_Selling_PRODUCT,
    GET_LIMITED_BEST_Selling_PRODUCT,
    ADD_ERROR
} from '../common/Constants';

const INITIAL_STATE = {
    images: [],
    categories: [],
    limited_best_selling: [],
    limited_new: [],
    best_selling: [],
    Loading: true,
    error_message: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SLIDER_IMAGES:
            return { ...state, images: action.payload, Loading: false }
        case GET_HOME_CATEGORIES:
            return { ...state, categories: action.payload }
        case GET_LIMITED_NEW_PRODUCTS:
            return { ...state, limited_new: action.payload }
        case GET_LIMITED_BEST_Selling_PRODUCT:
            return { ...state, limited_best_selling: action.payload }
        case GET_BEST_Selling_PRODUCT:
            return { ...state, best_selling: action.payload }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state;
    }
}