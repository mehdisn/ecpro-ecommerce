import { getCategories } from '../common/Api';
import {
    GET_CATEGORY,
    ADD_ERROR
} from '../common/Constants';

export const getAllCategories = () => async dispatch => {
    getCategories().then(categories => {
        dispatch({ type: GET_CATEGORY, payload: categories });
    }).catch(err => {
        console.log(err.message)
        dispatch({ type: ADD_ERROR, payload: err.message });
    })
}