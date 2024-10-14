import { findProductByCategory, findProductById, createComment, findProductComments } from '../common/Api';
import {
    GET_PRODUCT_BY_CATEGORY,
    ADD_ERROR,
    REFRESH_PRODUCT_LIST,
    CLEAR_STATE,
    FLIND_PRODUCT_DETAILS,
    FIND_PRODUCT_COMMENTS
} from '../common/Constants'

export const getProductByCategory = (categoryId, page) => async dispatch => {
    if (!page || page === undefined) page = 1
    findProductByCategory(categoryId, page).then(products => {
        dispatch({ type: GET_PRODUCT_BY_CATEGORY, products: products.result.rows, count: products.result.count, pages: products.pages, child_categories: products.categories.childs })
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const refreshProductList = (categoryId, page) => async dispatch => {
    if (!page || page === undefined) page = 1
    findProductByCategory(categoryId, page).then(products => {
        dispatch({ type: REFRESH_PRODUCT_LIST, products: products.result.rows, count: products.result.count, pages: products.pages, child_categories: products.categories.childs })
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const findProductDetails = (productId) => async dispatch => {
    await findProductById(productId).then(async product => {
        await dispatch({ type: FLIND_PRODUCT_DETAILS, product: product.product, commentCount: product.product.commentsCount, productImages: product.product.product_images });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const FindProductComments = (productId) => async dispatch => {
    findProductComments(productId).then(comments => {
        dispatch({ type: FIND_PRODUCT_COMMENTS, comments: comments });
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const addNewComment = ({ productId, content, title, rating }) => async dispatch => {
    await createComment({ productId: productId, content: content, title: title, rating: rating }).then(async message => {
        alert('دیدگاه شما با موفقیت ثبت شد');
    }).catch(err => {
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}

