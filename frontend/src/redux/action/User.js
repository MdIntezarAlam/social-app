//login User Action
import axios from 'axios'

//email & password se hi login karna hai thos isko hi backend mai send karna  hai



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
        console.log(data)
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
            payload: error
        })
    }
}
