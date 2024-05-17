import { createAction, createReducer } from '@reduxjs/toolkit'

const updateLocation = createAction('UPDATE_LOCATION');
const initialState = {latlng: {lat: 0, lng: 0}};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateLocation, (state, action) => {
            state.latlng = action.latlng;
        })  
})

export default locationReducer;