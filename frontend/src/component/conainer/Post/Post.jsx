import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../../styles/post.css'
import { Typography, FavoriteBorderIcon, Button, ChatBubbleIcon, DeleteOutlineIcon, Avatar, FavoriteIcon, MoreVert, Dialog } from '../../icons/MaterialIcons'
import { addCommnetAction, likePostAction } from '../../../redux/action/post.action'
import { getfolloingPostAction } from '../../../redux/action/User'
import User from '../user/User'
import CommentCard from '../commnetCard/CommentCard'


const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerName,
    ownerImage,
    ownerId,
    isDelete = false,
    isAccount = false
}) => {


    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()



    const [liked, setLiked] = useState(false)
    const [likeUser, setLikeUser] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [commentTougle, setCommentTougle] = useState(false)
    const { message } = useSelector((state) => state.likePost)
    // likes
    const hanldeLikedFun = async () => {
        setLiked(!liked)
        await dispatch(likePostAction(postId))


        if (isAccount) {
            console.log("pring me my post")
        }
        else {
            dispatch(getfolloingPostAction())
        }
    }

    //commnet form 
    const addCommnethandlerSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addCommnetAction(postId, commentValue))
        if (isAccount) {
            console.log("pring me my post")
        }
        else {
            dispatch(getfolloingPostAction())
        }
    }



    useEffect(() => {
        //refersh page hone ke baad bhee likes rahega
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true)
            }
        });
    }, [likes, user._id])





    return (
        <div className='post'>
            <div className='post_header'>
                {isAccount ? <Button><MoreVert /></Button> : null}
            </div>
            <img src={postImage} alt="postImg" className='postImg' />
            <div className='post_details'>
                <Avatar sx={{ width: "3vmax", height: "3vmax" }} src={ownerImage} alt="postAvatar" />
                <Link to={`/user/${ownerId}`}>
                    <p>{ownerName}</p>
                </Link>
                <p className='caption'>{caption}</p>
            </div>

            <button
                className='post_btn'
                onClick={() => setLikeUser(!likeUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <p>{likes.length} likes</p>
            </button>

            <div className='footer_post'>
                <Button onClick={hanldeLikedFun}>
                    {liked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </Button>
                <Button onClick={() => setCommentTougle(!commentTougle)}>
                    <ChatBubbleIcon />
                </Button>
                {isDelete
                    ?
                    <Button>
                        <DeleteOutlineIcon />
                    </Button>
                    : null
                }
            </div>
            {/* likes */}
            <Dialog onClose={() => setLikeUser(!likeUser)}
                open={likeUser}>
                <div className='dialogBox'>
                    <Typography variant="h5" component="div">liked By</Typography>

                    {likes.map((like => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    )))}
                </div>
            </Dialog>
            {/* Comments */}
            <Dialog onClose={() => setCommentTougle(!commentTougle)} open={commentTougle}>
                <div className='dialogBox'>
                    <Typography variant="h5" component="div">comments</Typography>
                    <form className='commnet_Form forms' onSubmit={addCommnethandlerSubmit}>
                        <input type="text"
                            className='comment_input'
                            placeholder='comment'
                            value={commentValue}
                            required
                            onChange={(e) => setCommentValue(e.target.value)}
                        />
                        <button type='submit' variant="contained" className='c_btn'>Add</button>
                    </form>
                    {comments.length > 0 ? comments.map((item) => (
                        <CommentCard
                            key={item._id}
                            userId={item.user._id}
                            name={item.user.name}
                            avatar={item.user.avatar.url}
                            comment={item.comment}
                            commentId={item._id}
                            postId={postId}
                            isAccount={isAccount}
                        />

                    )) : <Typography>empty comment</Typography>}
                </div>
            </Dialog>
        </div>
    )
}

export default Post