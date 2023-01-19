
import axios from "axios"

//like post
export const likePostAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequestPending"
        })

        const { data } = await axios.post(`/api/v1/post/${id}`);

        dispatch({
            type: "likeRequestSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "likeRequestFails",
            payload: error.responce.data.message
        })
    }
}

//myPost Actions
export const getMyPostAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "mypostRequestPending"
        })

        const { data } = await axios.get("/api/v1/my/post");

        dispatch({
            type: "mypostRequestSuccess",
            payload: data.posts
        })
    } catch (error) {
        dispatch({
            type: "mypostRequestFails",
            payload: error.responce.data.message
        })
    }
}


// Add comment Actions  sab ka same hi hai

export const addCommnetAction = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addcommentRequest"
        })
        const { data } = await axios.put(`/api/v1/post/comment/${id}`, {
            comment
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "addcommentSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "addcommentFails",
            payload: error.responce.data.message
        })

    }
}

//delete commetn
export const deleteCommnetAction = (id, commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest"
        })
        const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
            data: commentId,
        })
        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteCommentFails",
            payload: error.responce.data.message
        })

    }
}