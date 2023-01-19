import React from 'react'
import { Button, DeleteIcon, Typography } from '../../icons/MaterialIcons'
import "../../../styles/commentCard.css"
import { Link } from 'react-router-dom'
import { deleteCommnetAction } from '../../../redux/action/post.action'
import { useDispatch, useSelector } from 'react-redux'


const CommentCard = ({
    userId,
    name,
    postId,
    avatar,
    comment,
    commentId,
    isAccount
}) => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    //delete comment
    const deleteComment = () => {
        dispatch(deleteCommnetAction(postId, commentId))
    }



    return (
        <div className='c_container'>
            <Link to={`/user/${userId}`} className='c_imgContainer'>
                <img  src={avatar}  alt="c_img"  className='c_img'  />
                <p className='c_name'>{name}</p>
            </Link>
            <p className='c_commnet'>{comment}</p>

            {isAccount ?
                (<Button onClick={deleteComment} className='c_deltee'>
                    <DeleteIcon />
                </Button>) :
                userId === user._id ?
                    (
                        <Button onClick={deleteComment} className='c_deltee'>
                            <DeleteIcon />
                        </Button>
                    ) : null

            }
        </div>
    )
}

export default CommentCard

