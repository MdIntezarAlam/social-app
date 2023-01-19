//it is same as a react-redux
import { createReducer } from "@reduxjs/toolkit"

const initilaState = {
    isAuthenticated: false
}

export const userReducer = createReducer(initilaState, {
    //login user  reducer  
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true

    },
    loginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false
    },
    clearError: (state) => {
        state.error = null
    },



    //Reister user *****************************
    registerRequest: (state) => {
        state.loading = true;

    },
    registerSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    },
    registerFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false
    },
    clearError: (state) => {
        state.error = null
    },

    //All User Load User  ************
    loadRequest: (state) => {
        state.loading = true;
    },
    loadSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true

    },
    loadFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false
    },
    clearError: (state) => {
        state.error = null
    },
})


//post reducer
export const postofFolloingReducer = createReducer(initilaState, {
    postofFollowingRequest: (state) => {
        state.loading = true
    },
    postofFollowingSuccess: (state, action) => {
        state.loading = false
        state.posts = action.payload
    },
    postofFollowingFails: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: (state) => {
        state.error = null
    },
})


//get user Details Reducers
export const getAllUserReducer = createReducer(initilaState, {
    getAllUserRequest: (state) => {
        state.loading = true
    },
    getAllUserSuccess: (state, action) => {
        state.loading = false
        state.users = action.payload
    },
    getAllUserFails: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearError: (state) => {
        state.error = null
    },
})