import { createAction, createReducer } from '@reduxjs/toolkit'

const addItem = createAction('ADD_ITEM')
const removeItem = createAction('REMOVE_ITEM')
const openCart = createAction('OPEN_CART');
const closeCart = createAction('CLOSE_CART');
const initialState = { cart: [], open: false };

const cartReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(addItem, (state, action) => {                            //the 'case'
      state.cart.push(action.item)
    })
    .addCase(removeItem, (state, action) => {
      state.cart = state.cart.filter(item => {
            if(item.name === action.item)
                return false;
            else    
                return true;
      })                     
    })
    .addCase(openCart, (state) => {
      state.open = true
    })
    .addCase(closeCart, (state) => {
      state.open = false
    })
})


export default cartReducer