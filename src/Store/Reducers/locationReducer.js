import { createAction, createReducer } from '@reduxjs/toolkit'

const updateUsersLocation = createAction('UPDATE_USERS_LOCATION');
const updateRestaurantLocation = createAction('UPDATE_RESTAURANT_LOCATION');
const clear = createAction('CLEAR');
const initialState = {user: {lat: 0, lng: 0}, restaurant: {lat: 0, lng: 0}};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateUsersLocation, (state, action) => {
            state.user = action.latlng;
        })  
        .addCase(updateRestaurantLocation, (state, action) => {
            state.restaurant = action.latlng;
        })
        .addCase(clear, (state) => {
            state.user = initialState.user;
            state.restaurant = initialState.restaurant;
        })
})

export default locationReducer;