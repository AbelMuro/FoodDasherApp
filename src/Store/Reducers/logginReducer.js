import { createAction, createReducer } from '@reduxjs/toolkit'

const updateLogin = createAction('UPDATE_LOGGIN');
const initialState = {isLoggedIn: false};

const logginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateLogin, (state, action) => {
            state.isLoggedIn = action.loggedIn;
        })
})

export default logginReducer;