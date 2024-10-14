import {
    SET_SLIDER_IMAGE,
    PENDING,
    CREATE_PRODUCT,
    GET_ADMIN_USERS,
    GET_ALL_USERS,
    GET_NEW_ORDERS,
    GET_ALL_ORDERS,
    GET_ORDER_DETAILS,
    END_PENDING,
    ADD_ERROR
} from '../common/Constants';

const INITIAL_STATE = {
    images: [],
    product: {},
    admin_users: [],
    users: [],
    count: '',
    new_orders: [],
    order_count: '',
    orders: [],
    order: [],
    address: {},
    Loading: false,
    error_message: ""
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload)
    switch (action.type) {
        case SET_SLIDER_IMAGE:
            return { ...state, images: action.payload, Loading: false }
        case PENDING:
            return { ...state, Loading: true }
        case END_PENDING:
            return { ...state, Loading: false }
        case CREATE_PRODUCT:
            return { ...state, product: action.payload, Loading: false }
        case GET_ADMIN_USERS:
            return { ...state, admin_users: action.payload, Loading: false }
        case GET_ALL_USERS:
            return { ...state, users: action.users, count: action.count, Loading: false }
        case GET_NEW_ORDERS:
            return { ...state, new_orders: action.payload.result.rows, order_count: action.payload.result.count, Loading: false }
        case GET_ALL_ORDERS:
            return { ...state, orders: action.payload.result.rows, Loading: false }
        case GET_ORDER_DETAILS:
            return { ...state, order: action.payload, address: action.address, Loading: false }
        case ADD_ERROR:
            return { ...state, error_message: action.payload, Loading: false }
        default:
            return state;
    }
}