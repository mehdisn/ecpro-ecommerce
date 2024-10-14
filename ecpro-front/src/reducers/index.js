import { combineReducers } from 'redux';

import AuthReducers from './AuthReducers';
import CategoryReducers from './CategoryReducers';
import ProductReducers from './ProductReducers';
import CartReducers from './CartReducers';
import OrderReducers from './OrderReducers';
import HomeReducers from './HomeReducers';
import SearchReducers from './SearchReducers';
import CrmReducers from './CrmReducers';

export default combineReducers({
    auth: AuthReducers,
    category: CategoryReducers,
    product: ProductReducers,
    cart: CartReducers,
    order: OrderReducers,
    home: HomeReducers,
    search: SearchReducers,
    crm: CrmReducers
});