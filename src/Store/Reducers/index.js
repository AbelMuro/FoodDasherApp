import { combineReducers } from 'redux';
import cartReducer from './cartReducer.js';
import locationReducer from './locationReducer.js';

const rootReducer = combineReducers({
    cart: cartReducer,
    location: locationReducer
})
export default rootReducer;