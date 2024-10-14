import {
    GET_CATEGORY,
    ADD_ERROR
} from '../common/Constants';

const INITIAL_STATE = {
    categories: [],
    Loading: true,
    error_message: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return { ...state, categories: action.payload, Loading: false }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state;
    }
}