import { createAction, createReducer } from '@reduxjs/toolkit'

const updateDeliveryOption = createAction('UPDATE_DELIVERY_OPTION');
const updateDropOffOption = createAction('UPDATE_DROPOFF_OPTION');
const updateDropOffInstructions = createAction('UPDATE_DROPOFF_INSTRUCTIONS');
const updateDeliveryTime = createAction('UPDATE_DELIVERY_TIME');
const updateCardNumber = createAction('UPDATE_CARD_NUMBER');
const updateCardCvc = createAction('UPDATE_CARD_CVC');
const updateCardZip = createAction('UPDATE_CARD_ZIP');
const updateCardExpiration = createAction('UPDATE_CARD_EXPIRATION');
const updateTotal = createAction('UPDATE_TOTAL');
const initialState = {
    deliveryOption: 'Standard', 
    dropOffOption: 'Hand it to me', 
    dropOffInstructions: '', 
    deliveryTime: '', 
    total: '',
    creditCard: {
        number: '', 
        cvc: '', 
        zip: '',
        expiration: '',
    }};

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
        .addCase(updateDeliveryTime, (state, action) => {
            state.deliveryTime = action.deliveryTime;
        })
        .addCase(updateCardNumber, (state, action) => {
            state.creditCard.number = action.number;
        })
        .addCase(updateCardCvc, (state, action) => {
            state.creditCard.cvc = action.cvc;
        })
        .addCase(updateCardZip, (state, action) => {
            state.creditCard.zip = action.zip;
        })
        .addCase(updateCardExpiration, (state, action) => {
            state.creditCard.expiration = action.expiration;
        })
        .addCase(updateTotal, (state, action) => {
            state.total = action.total;
        })  
})

export default locationReducer;