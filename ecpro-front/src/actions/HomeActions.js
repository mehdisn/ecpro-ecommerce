import { getSliderImage, getCategories, findAllProducts } from '../common/Api';
import {
    GET_SLIDER_IMAGES,
    GET_HOME_CATEGORIES,
    GET_BEST_Selling_PRODUCT,
    GET_LIMITED_BEST_Selling_PRODUCT,
    GET_LIMITED_NEW_PRODUCTS,
    ADD_ERROR
} from '../common/Constants'

export const getHomeSliderImage = () => async dispatch => {
    getSliderImage().then(images => {
        dispatch({ type: GET_SLIDER_IMAGES, payload: images.sliderImages });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getHomeCategories = (limit) => async dispatch => {
    getCategories({ limit: limit }).then(categories => {
        dispatch({ type: GET_HOME_CATEGORIES, payload: categories });
    }).catch(err => {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getLimitedNewProducts = (limit) => async dispatch => {
    findAllProducts({ limit: limit, order: 'createdAt' }).then(products => {
        dispatch({ type: GET_LIMITED_NEW_PRODUCTS, payload: products.result });
    }).catch(err => {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const getLimitedBestSellingProducts = (limit) => async dispatch => {
    findAllProducts({ limit: limit, order: 'salesCount' }).then(products => {
        dispatch({ type: GET_LIMITED_BEST_Selling_PRODUCT, payload: products.result });
    }).catch(err => {
        console.log(err);
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}
