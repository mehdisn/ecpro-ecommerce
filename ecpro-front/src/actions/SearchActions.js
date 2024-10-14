import { findAllProducts, findProductsByCategory } from '../common/Api';
import { SEARCH_PRODUCTS, ADD_ERROR } from '../common/Constants';

export const searchProducts = ({ order, searchText, page }) => async dispatch => {
    if (!page || page === undefined) page = 1
    findAllProducts({ order: order, page: page, productName: searchText }).then(products => {
        dispatch({ type: SEARCH_PRODUCTS, payload: products.result.rows })
    }).catch(err => {
        console.log(err + '********************************')
        dispatch({ type: ADD_ERROR, payload: err })
    })
}