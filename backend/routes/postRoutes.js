import express from 'express'
import { commnetOnPost, createPost, deletePost, deleteComment, getPostFollowing, likeAnddislike, updateCaption } from '../controller/postController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()


router
    .route("/post/upload")
    .post(isAuthenticated, createPost)

router
    .route("/post/:id")
    .post(isAuthenticated, likeAnddislike)
    .delete(isAuthenticated, deletePost)
    .put(isAuthenticated, updateCaption)

router
    .route("/posts")
    .get(isAuthenticated, getPostFollowing)


router
    .route("/post/comment/:id")
    .put(isAuthenticated, commnetOnPost)
    .delete(isAuthenticated, deleteComment)

    
export default router