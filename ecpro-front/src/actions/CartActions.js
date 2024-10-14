import { addToCart, getCart, deleteFromCart, decQty } from '../common/Api';
import {
    ADD_TO_CART,
    ADD_ERROR,
    GET_CART
} from '../common/Constants'

export const addProductToCart = (productId) => async dispatch => {
    addToCart({ productId: productId }).then(cart => {
        dispatch({ type: GET_CART, Items: cart.Items, itemsCount: cart.cart.itemsCount, total: cart.cart.total });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getShoppingCart = () => async dispatch => {
    getCart().then(cart => {
        dispatch({ type: GET_CART, Items: cart.Items, itemsCount: cart.cart.itemsCount, total: cart.cart.total, outOfStock: cart.Out_of_stocks, priceChanged: cart.Price_changed});
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const deleteProductFromCart = (productId) => async dispatch => {
    deleteFromCart(productId).then(cart => {
        dispatch({ type: GET_CART, Items: cart.Items, itemsCount: cart.cart.itemsCount, total: cart.cart.total });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const decProductQty = (productId) => async dispatch => {
    decQty(productId).then(cart => {
        dispatch({ type: GET_CART, Items: cart.Items, itemsCount: cart.cart.itemsCount, total: cart.cart.total });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}
