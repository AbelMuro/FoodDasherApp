import { createAction, createReducer } from '@reduxjs/toolkit'

const updateDeliveryOption = createAction('UPDATE_DELIVERY_OPTION');
const updateDropOffOption = createAction('UPDATE_DROPOFF_OPTION');
const updateDropOffInstructions = createAction('UPDATE_DROPOFF_INSTRUCTIONS');
const updateDeliveryTime = createAction('UPDATE_DELIVERY_TIME');
const updateCardNumber = createAction('UPDATE_CARD_NUMBER');
const updateCardCvc = createAction('UPDATE_CARD_CVC');
const updateCardZip = createAction('UPDATE_CARD_ZIP');
const updateCardExpiration = createAction('UPDATE_CARD_EXPIRATION');
const updateSchedule = createAction('UPDATE_SCHEDULE');
const updateTotal = createAction('UPDATE_TOTAL');
const clear = createAction('CLEAR');
const updateTip = createAction('UPDATE_TIP');
const initialState = {
    deliveryOption: {
        option: 'Standard',
        deliveryTime: '',
        schedule: '',
    },
    dropOffOption: 'Hand it to me', 
    dropOffInstructions: '', 
    total: '',
    tip: '5.00',
    creditCard: {
        number: '', 
        cvc: '', 
        zip: '',
        expiration: '',
    }};

const locationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateDeliveryOption, (state, action) => {
            state.deliveryOption.option = action.option;
        })  
        .addCase(updateDeliveryTime, (state, action) => {
            state.deliveryOption.deliveryTime = action.deliveryTime;
        })    
        .addCase(updateSchedule, (state, action) => {
            state.deliveryOption.schedule = action.schedule;
        })      
        .addCase(updateDropOffOption, (state, action) => {
            state.dropOffOption = action.option;
        })
        .addCase(updateDropOffInstructions, (state, action) => {
            state.dropOffInstructions = action.text;
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
        .addCase(clear, (state) => {
            state.deliveryOption = initialState.deliveryOption;
            state.dropOffOption = initialState.dropOffOption;
            state.dropOffInstructions = initialState.dropOffInstructions;
            state.total = initialState.total;
            state.creditCard = initialState.creditCard;
            state.tip = initialState.tip;
        })
        .addCase(updateTip, (state, action) => {
            state.tip = action.tip;
        })
})

export default locationReducer;