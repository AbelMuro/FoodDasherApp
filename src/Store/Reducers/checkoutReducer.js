import { createAction, createReducer } from '@reduxjs/toolkit'

const updateDeliveryOption = createAction('UPDATE_DELIVERY_OPTION');
const updateDropOffOption = createAction('UPDATE_DROPOFF_OPTION');
const updateDropOffInstructions = createAction('UPDATE_DROPOFF_INSTRUCTIONS');
const updateSchedule = createAction('UPDATE_SCHEDULE');
const initialState = {deliveryOption: 'Standard', dropOffOption: 'Hand it to me', dropOffInstructions: '', schedule: ''};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateDeliveryOption, (state, action) => {
            state.deliveryOption = action.option;
        })  
        .addCase(updateDropOffOption, (state, action) => {
            state.dropOffOption = action.option;
        })
        .addCase(updateDropOffInstructions, (state, action) => {
            state.dropOffInstructions = action.text;
        })
        .addCase(updateSchedule, (state, action) => {
            state.schedule = action.schedule;
        })
})

export default locationReducer;