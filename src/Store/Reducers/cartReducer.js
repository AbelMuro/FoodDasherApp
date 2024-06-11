import { createAction, createReducer } from '@reduxjs/toolkit'

const addItem = createAction('ADD_ITEM')
const removeItem = createAction('REMOVE_ITEM')
const openCart = createAction('OPEN_CART');
const closeCart = createAction('CLOSE_CART');
const updateCart = createAction('UPDATE_CART');
const updateRestaurant = createAction('UPDATE_RESTAURANT');
const clear = createAction('CLEAR');
const initialState = {items: [], open: false, restaurant: ''};

const sameIngredients = (itemOne, itemTwo) => {
    if(itemOne.length !== itemTwo.length)
      return false;
    for(let i = 0; i < itemOne.length; i++){
      if(!itemOne.includes(itemTwo[i]))
        return false;
    }
      return true
}

const cartReducer = createReducer(initialState, (builder) => {       
  builder
    .addCase(addItem, (state, action) => {   
      let item = state.items.find((item) => {
        if(item.name === action.item.name && sameIngredients(item.excludedIngredients, action.item.excludedIngredients))
            return true;
      })
      if(item)
        item.quantity += action.item.quantity
      else
        state.items.unshift(action.item)
    })
    .addCase(removeItem, (state, action) => {
      state.items = state.items.filter(item => {
            if(item.id === action.item.id)
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
    .addCase(updateCart, (state, action) => {
      state.items = state.items.map((item) => {
          if(item.id === action.item.id)
            return {...item, quantity: action.item.quantity};
          else  
            return item;
      })
    })
    .addCase(clear, (state) => {
        state.items = initialState.items;
        state.open = initialState.open;
        state.restaurant = initialState.restaurant;
    })
    .addCase(updateRestaurant, (state, action) => {
        state.restaurant = action.restaurant;
    })
})


export default cartReducer