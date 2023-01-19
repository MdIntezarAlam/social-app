import React, { useEffect, useState } from 'react'
import '../../../styles/newpost.css'
import { Button } from '../../icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { newPostAction } from '../../../redux/action/post.action'
import { useAlert } from 'react-alert'

const NewPost = () => {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")

    const { loading, error, message } = useSelector((state) => state.likePost)
    const dispatch = useDispatch()
    const alert = useAlert()
    //read and upload file

    const handleImageCahnge = (e) => {
        const file = e.target.files[0]
        const Reader = new FileReader(); //first read the file 
        Reader.readAsDataURL(file)
        
        Reader.onload = () => { //then jaise load ho jata hai setImage mai set kardena hai
            if (Reader.readyState === 2) {
                // console.log(Reader.result)
                setImage(Reader.result)
            }
        }
    }

    const imageSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(newPostAction( caption,image))
    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }

    }, [dispatch, error, message])


    return (
        <div className='n_post'>
            <form className='n_form' onSubmit={imageSubmitHandler}>
                <h3 className='n_heading'>New Post</h3>
                {image && <img src={image} alt="postImg" className='n_img' />}
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageCahnge}
                    placeholder='choose Files'
                    className='n_input'
                />
                <input
                    type="text"
                    placeholder='captions..........'
                    className='n_caption'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <Button disabled={loading} type='submit' className='n_btn'>post</Button>
            </form>

        </div>
    )
}

export default NewPost