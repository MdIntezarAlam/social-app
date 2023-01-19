import express from 'express'
import { deleteProfile, followUser, forgotPassword, getAllUser, getUserProfile, loginUser, logoutUser, myProfile, regesterUser, resetPassword, updatePassword, updateProfile, getMyPost } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
const router = express.Router()

router
    .route("/register").post(regesterUser)
router
    .route("/login").post(loginUser)
router
    .route("/logout").get(logoutUser)

router
    .route("/update/password")
    .put(isAuthenticated, updatePassword)
router
    .route("/update/profile")
    .put(isAuthenticated, updateProfile)
router
    .route("/follow/:id")
    .get(isAuthenticated, followUser)

router.route("/delete/me")
    .delete(isAuthenticated, deleteProfile)
router.route("/me")
    .get(isAuthenticated, myProfile)
router
    .route("/user/:id").get(isAuthenticated, getUserProfile)
router
    .route("/users").get(isAuthenticated, getAllUser)
router
    .route("/forgot/password")
    .post(forgotPassword)
router
    .route("/my/post")
    .get(isAuthenticated, getMyPost)

router
    .route("/password/reset/:token")
    .put(resetPassword)

export default router