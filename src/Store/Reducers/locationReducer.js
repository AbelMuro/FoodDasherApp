import { createAction, createReducer } from '@reduxjs/toolkit'

const updateUsersLocation = createAction('UPDATE_USERS_LOCATION');
const updateRestaurantLocation = createAction('UPDATE_RESTAURANT_LOCATION');
const initialState = {user: {lat: 0, lng: 0}, restaurant: {lat: 0, lng: 0}};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateUsersLocation, (state, action) => {
            state.user = action.latlng;
        })  
        .addCase(updateRestaurantLocation, (state, action) => {
            state.restaurant = action.latlng;
        })
})

export default locationReducer;