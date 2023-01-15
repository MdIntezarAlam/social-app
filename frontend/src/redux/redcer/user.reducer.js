//it is same as a react-redux
import { createReducer } from "@reduxjs/toolkit"


const initilaState = {

}

export const userReducer =createReducer (initilaState, {
    //login user  reducer  
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload

    },
    loginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },



    //Reister user *****************************
    registerRequest: (state) => {
        state.loading = true;

    },
    registerSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
    },
    registerFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    //Load User  ************
    loadRequest: (state) => {
        state.loading = true;

    },
    loadSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
    },
    loadFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
})