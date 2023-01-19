import React, { useEffect, useState } from 'react'
import '../../../styles/acc.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPostAction } from '../../../redux/action/post.action'
import Loader from '../Loader'
import Post from '../Post/Post'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import User from '../user/User'
import { logoutUser } from '../../../redux/action/User'


const Account = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading: userLoading, user } = useSelector((state) => state.user)
    const { loading, error, posts } = useSelector((state) => state.myPost)

    const { error: likeError, message } = useSelector((state) => state.likePost)
    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)


    //loout user
    const logoutUserHandler = () => {
        dispatch(logoutUser())
        alert.success("logout Successfully")
    }

    useEffect(() => {
        dispatch(getMyPostAction())
    }, [dispatch])


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

        loading === true || userLoading === true ? (<Loader />) : (
            <div className='acc'>
                <div className='acc_left'>
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

                    )) : <Typography className='acc_p'>not found</Typography>}
                </div>

                <div className='div_right'>
                    <img src={user.avatar.url} alt="acc-img" className='div_right_img' />
                    <p className='div_name'>  {user.name}</p>
                    <button className='div_btn' onClick={() => setFollowersToggle(!followersToggle)} >
                        Followers
                    </button>
                    <p className='div_num' >{user.followers.length}</p>
                    <button className='div_btn' onClick={() => setFollowingToggle(!followingToggle)}>
                        Following
                    </button>
                    <p className='div_num'>{user.following.length}</p>
                    <p className='div_post'>posts</p>
                    <p className='div_num'>{user.posts.length}</p>

                    <Button variant='contained' style={{ margin: "12px" }} onClick={logoutUserHandler}>Logout</Button>
                    <Link to="/update/profile" className='div_link'>Edit Profile </Link>
                    <Link to="/update/password" className='div_link'>Change Password</Link>
                    <Button variant='text' className='dlt_pro'>Delete my Profile</Button>

                    {/* Dialog followers */}
                    <Dialog onClose={() => setFollowersToggle(!followersToggle)} open={followersToggle}>
                        <div className='dialogBox'>
                            <Typography variant="h5" component="div">Followers</Typography>
                            {
                                user && user.followers.length > 0 ? user.followers.map((follower) => (
                                    <User
                                        key={follower._id}
                                        userId={follower._id}
                                        name={follower.name}
                                        avatar={follower.avatar.url}


                                    />

                                )) :

                                    <Typography>you don't have followers</Typography>

                            }
                        </div>
                    </Dialog>
                    {/* Dialog following */}
                    <Dialog onClose={() => setFollowingToggle(!followingToggle)} open={followingToggle}>
                        <div className='dialogBox'>
                            <Typography variant="h5" component="div">Followers</Typography>
                            {
                                user && user.following.length > 0 ? user.following.map((follow) => (
                                    <User
                                        key={follow._id}
                                        userId={follow._id}
                                        name={follow.name}
                                        avatar={follow.avatar.url}


                                    />

                                )) :

                                    <Typography>you don't have following</Typography>

                            }
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    )
}

export default Account




//  <Typography>you don't have followers</Typography> 