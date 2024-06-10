import { combineReducers } from 'redux';
import cartReducer from './cartReducer.js';
import locationReducer from './locationReducer.js';
import checkoutReducer from './checkoutReducer.js';

const rootReducer = combineReducers({
    cart: cartReducer,
    location: locationReducer,
    checkout: checkoutReducer,
})

export default rootReducer;