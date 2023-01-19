import React, { useEffect } from 'react'
import '../../../styles/Home.css'
import Post from '../Post/Post'
import User from '../user/User'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserActions, getfolloingPostAction } from '../../../redux/action/User'
import Loader from '../Loader'
import { useAlert } from 'react-alert'


const Home = () => {
  const dispatch = useDispatch()
  const { loading, posts, error } = useSelector((state) => state.postofFollowing)
  const { users, loading: loadingUser } = useSelector((state) => state.getAllUser)
  const alert = useAlert()
  const { error: likeError, message } = useSelector((state) => state.likePost)

  // console.log(posts)
  //following post show
  useEffect(() => {
    dispatch(getfolloingPostAction())
    dispatch(getAllUserActions())
  }, [dispatch])

  //post liked and unliked 
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "clearMessage" })
    }

    if (likeError) {
      alert.error(likeError)
      dispatch({ type: "clearMessage" })
    }
    if (message) {
      alert.success(message)
      dispatch({ type: "clearMessage" })
    }
  }, [alert, message, error, likeError, dispatch])





  return (
    loading === true || loadingUser === true ? (<Loader />) : (
      <div className='home_'>
        <div className='h_left'>
          {posts && posts.length > 0 ? posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          )) : <p>Post Not Found</p>}
        </div>
        <div className='h_right'>
          {users && users.length > 0 ? users.map((user) =>
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />

          ) : <p>user not found</p>}
        </div>
      </div>
    )

  )
}

export default Home