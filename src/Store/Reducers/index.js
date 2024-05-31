import { combineReducers } from 'redux';
import cartReducer from './cartReducer.js';
import locationReducer from './locationReducer.js';
import checkoutReducer from './checkoutReducer.js';
import logginReducer from './logginReducer.js';

const rootReducer = combineReducers({
    cart: cartReducer,
    location: locationReducer,
    checkout: checkoutReducer,
    user: logginReducer
})

export default rootReducer;