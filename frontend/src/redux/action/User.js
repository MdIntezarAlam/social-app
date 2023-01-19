//login User Action
import axios from 'axios'

//email & password se hi login karna hai tho isko hi backend mai send karna  hai
export const loginUser = (email, password) => async (dispatch) => {

    try {
        //login user pending
        dispatch({
            type: "loginRequest",
        })
        //Api request
        const { data } = axios.post("/api/v1/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",
            }
        })

        //login user success
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    }
    //login user fails
    catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.responce.data.message

        })
    }
}



//LOAD USER ACTION
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "loadRequest"
        })
        //get All The User Data
        const { data } = await axios.get("/api/v1/me")
        dispatch({
            type: "loadSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "loadFail",
            payload: error.responce.data.message

        })
    }
}



//post user actions
export const getfolloingPostAction = () => async (dispatch) => {
    try {
        dispatch({
            type: "postofFollowingRequest"
        })

        const { data } = await axios.get("/api/v1/posts")

        dispatch({
            type: "postofFollowingSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "postofFollowingFails",
            payload: error.responce.data.message
        })
    }
}



//get AllUser Details Actions

export const getAllUserActions = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUserRequest"
        })
        const { data } = await axios.get("/api/v1/users")
        dispatch({
            type: "getAllUserSuccess",
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: "getAllUserFails",
            payload: error.responce.data.message
        })
    }
}
