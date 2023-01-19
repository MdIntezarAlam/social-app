import { sendEmail } from "../middleware/sendEmail.js";
import postModule from "../modules/postMoodule.js";
import userModule from "../modules/userModule.js";
import crypto from 'crypto'
//register user
export const regesterUser = async (req, res) => {
    try {
        //module mai jo kuch bhee hai sab ko pahle reterive kre
        const { name, email, password } = req.body;
        //agr user a;ready exist karta hai tho user already exist show karna hai else new user added karna hai
        let user = await userModule.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "Dekho User already exist karta hai" })
        }
        //agr user nahi exist karta hai tho then new user ko add kerna hai
        user = await userModule.create({
            name,
            email,
            password,
            avatar: {
                public_id: "public-url",
                url: "abhee ke leye simple url hai"
            },
        })

        const token = await user.generateToken()
        const cookieOption = {
            expires: new Date(Date.now() + 80 * 44 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(201).cookie("token", token, cookieOption).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//loginUser api
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModule.findOne({ email }).select("+password").populate("posts followers following")
        if (!user) {
            return res.status(400).json({ success: false, message: "Dekho User exist nahi karta hai" })
        }

        //agr passwor match nahi karta hai
        const isMatchPassword = await user.matchPassword(password)  //ye method ko module file mai banaya gya hai
        if (!isMatchPassword) {
            return res.status(400).json({ success: false, message: "Dekho passwod incorrect  hai" })
        }
        //agr sab kuch miljata hai tab send karna hai
        //login karne ke leye pahele cookie mai store kre phir json mai send kare
        const token = await user.generateToken()
        const cookieOption = {
            expires: new Date(Date.now() + 80 * 44 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, cookieOption).json({
            success: true,
            user,
            token
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//logout user
export const logoutUser = async (req, res) => {
    try {
        //cookies mai bhee data store hai waha se bhee data ko direct reset kar dena hai jisse logout ho jayega
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "User Logout"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//follow and unfollow  a post 
export const followUser = async (req, res) => {
    try {
        const userToFollow = await userModule.findById(req.params.id)   // wo user serach karna hsi jisko hame follow karna hai
        const logginedInUser = await userModule.findById(req.user._id) //ab ham ko khid ko bhee search karna hai
        //agr  user nahi mita hai tho erro  show karna hai
        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }
        //user followed
        if (logginedInUser.following.includes(userToFollow._id)) {

            const indexFollowing = logginedInUser.following.indexOf(userToFollow._id)
            logginedInUser.following.splice(indexFollowing, 1);

            const indexFollowers = userToFollow.followers.indexOf(logginedInUser._id)
            userToFollow.followers.splice(indexFollowers, 1)

            await logginedInUser.save()
            await userToFollow.save()

            return res.status(200).json({
                success: true,
                message: "user unfollowed "
            })
        }
        //ye user folowed 
        else {
            logginedInUser.following.push(userToFollow._id)
            userToFollow.followers.push(logginedInUser._id)

            await logginedInUser.save()
            await userToFollow.save()

            return res.status(200).json({
                success: true,
                message: "user  followed "
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//update password


export const updatePassword = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id).select("+password")

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "please enter old and new password"
            })
        }

        //agr match karta hai tho update kar do else error show karna  hai
        const isMatchPassword = await user.matchPassword(oldPassword)  // ye mthod modules mai defined hai jo hsahing keya huwa hai
        if (!isMatchPassword) {
            return res.status(404).json({
                success: false,
                message: "password Does not match"
            })
        }

        user.password = newPassword;
        await user.save()

        res.status(200).json({
            success: true,
            message: "password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//update dprofile Api
export const updateProfile = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id)
        const { name, email } = req.body

        //agr name and email ko update karna hai only
        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        //user avatar
        await user.save()

        res.status(200).json({
            success: true,
            message: "profile updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete my own profile

export const deleteProfile = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id)
        const userId = user._id
        //remove karne se pahele user ka sab posted ko delete karna hoga jitna bhee ye post keya hai
        const posts = user.posts
        const followers = user.followers;
        const following = user.following;

        await user.remove()
        //user delete karte hi logout bhee sath mai kar dena hai

        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })


        //for loop mai itrate kar ke  delete kar dena hai iska sab post
        for (let i = 0; i < posts.length; i++) {
            const post = await postModule.findById(posts[i]);
            await user.remove()
        }

        //deleting user from follower following

        for (let i = 0; i < followers.length; i++) {
            const follower = await userModule.findById(followers[i]);

            const index = follower.following.indexOf(userId)
            follower.following.splice(index, 1)
            await follower.save()
        }


        //deleting user from followering follower

        for (let i = 0; i < following.length; i++) {
            const follows = await userModule.findById(following[i]);

            const index = follows.followers.indexOf(userId)
            follows.followers.splice(index, 1)
            await follows.save()
        }


        res.status(200).json({
            success: true,
            message: "profile deleted successfuly "
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}






//myProfile APi
export const myProfile = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id).populate("posts followers following")
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get UserProfile Api
export const getUserProfile = async (req, res) => {
    try {
        const user = await userModule.findById(req.params.id).populate("posts followers following")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get AllUsers Api
export const getAllUser = async (req, res) => {
    try {
        const users = await userModule.find({})
        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get My Post
export const getMyPost = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id)
        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await postModule.findById(user.posts[i]).populate("likes comments.user owner")
            posts.push(post)
        }

        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
//get forgotPassword Api
export const forgotPassword = async (req, res) => {
    try {
        const user = await userModule.findOne({ email: req.body.email })

        if (!user) {
            res.status(404).json({
                success: false,
                message: "email not foudm"
            });
        }
        //generete reset password token
        const resetPasswordToken = user.getResetpasswordToken() //ye mthd ko module mei banaya gya hai
        await user.save()

        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`
        const message = ` resert your password by clicking on the link \n\n ${resetUrl}`

        try {
            await sendEmail({
                email: user.email,
                subject: "reset Password",
                message
            });


            res.status(200).json({
                success: true,
                message: `email sent to ${user.email}`
            })


        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()

            res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//reset Password

export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")


        const user = await userModule.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has Expired"
            })
        }
        //agr sab kuch shai mila tab password reset kar sakte hai
        user.password = req.body.password
        //save karne se pahele dono ko undefined kar dena hai jisse ke database mai save na ho
        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined

        await user.save()

        res.status(200).json({
            success: true,
            message: "password updated successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}