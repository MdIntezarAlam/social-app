import { configureStore } from '@reduxjs/toolkit'
import { likeReducer, postReducer} from '../redcer/post.reducer'
import { getAllUserReducer, postofFolloingReducer, userReducer } from '../redcer/user.reducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        postofFollowing: postofFolloingReducer,
        getAllUser: getAllUserReducer,
        likePost: likeReducer,   //likePost reducer sba ka same hai jaise post , comment , update donn't confused
        myPost: postReducer
    },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store
