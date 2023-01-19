//posr reducer 
import { createReducer } from "@reduxjs/toolkit"
const initailState = {

}

//like Reducer
export const likeReducer = createReducer(initailState, {
    //like reducer
    likeRequestPending: (state) => {
        state.loading = true;
    },
    likeRequestSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    likeRequestFails: (state) => {
        state.loading = false;
    },

    //add commnet reducer***********************************
    addcommentRequest: (state) => {
        state.loading = true
    },
    addcommentSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    addcommentFails: (state) => {
        state.loading = false
    },

    //delete commnet Reducer

    deleteCommentRequest: (state) => {
        state.loading = true
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    deleteCommentFails: (state) => {
        state.loading = false
    },


    likeRequestError: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.error = null
    }
})

//post Reducer
export const postReducer = createReducer(initailState, {
    //like reducer
    mypostRequestPending: (state) => {
        state.loading = true;
    },
    mypostRequestSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload
    },
    mypostRequestFails: (state) => {
        state.loading = false;
    },
    likeRequestError: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.error = null
    }
})