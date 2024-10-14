import {
    GET_PRODUCT_BY_CATEGORY,
    REFRESH_PRODUCT_LIST,
    ADD_ERROR,
    CLEAR_STATE,
    FLIND_PRODUCT_DETAILS,
    FIND_PRODUCT_COMMENTS
} from '../common/Constants';

const INITIAL_STATE = {
    products: [],
    product: {},
    productImages: [],
    child_categories: [],
    count: '',
    error_message: '',
    pages: 0,
    commentCount: '',
    Loading: true,
    comments: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_BY_CATEGORY:
            return { ...state, products: [...state.products, ...action.products], count: action.count, pages: action.pages, child_categories: action.child_categories }
        case REFRESH_PRODUCT_LIST:
            return { ...state, products: action.products, count: action.count, pages: action.pages, child_categories: action.child_categories, Loading: false }
        case FLIND_PRODUCT_DETAILS:
            return { ...state, product: action.product, commentCount: action.commentCount, productImages: action.productImages }
        case FIND_PRODUCT_COMMENTS:
            return { ...state, comments: action.comments }
        case CLEAR_STATE:
            return { ...state, products: [], count: '', pages: 0, error_message: '', Loading: true }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state;
    }
}