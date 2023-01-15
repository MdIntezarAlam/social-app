import postModule from "../modules/postMoodule.js"
import userModule from "../modules/userModule.js"


// create a post Request Api
export const createPost = async (req, res) => {
    try {
        //jitna bhee module hai postModule mai usko reterive kre pahle
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body.public_id",
                url: "req.body.url",
            },
            owner: req.user._id,
        };
        const post = await postModule.create(newPostData)
        const user = await userModule.findById(req.user._id)
        user.posts.push(post._id)

        await user.save()

        res.status(201).json({ success: true, post })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

//like and  dislike post Api Request 
export const likeAnddislike = async (req, res) => {
    //agr user double tab karega tab like ho jayega else dislike ho jayega
    try {
        const post = await postModule.findById(req.params.id)

        ///check if wrong id then return error
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post  not found"
            })
        }
        //check if user is already liked then unlike kar dena hai else like kardena using if-else mth
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)

            await post.save()

            return res.status(200).json({
                success: true,
                message: "post unliked"
            })
        }
        //    else post ko  liked kar dena hai 
        else {
            post.likes.push(req.user._id)
            await post.save()
            return res.status(200).json({
                success: true,
                message: "post liked"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//delete  a post 
export const deletePost = async (req, res) => {
    const post = await postModule.findById(req.params.id)

    try {
        //agr post nahi paya gya tab
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }
        ///owner ka id  se math kar ke delte karna hai
        //agr payagaya tab
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "unauthorized "
            })
        }
        await post.remove()

        const user = await userModule.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id)
        user.posts.splice(index, 1)

        await user.save()

        res.status(200).json({
            success: true,
            message: "post deleted "
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



//  getPostFollowing Api
export const getPostFollowing = async (req, res) => {
    try {
        const user = await userModule.findById(req.user._id)
        const posts = await postModule.find({
            owner: {
                $in: user.following,
            },
        })

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


//update Captions

export const updateCaption = async (req, res) => {
    try {
        const post = await postModule.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not Found"
            })
        }
        //agr koi dusra banda hai tho usko unauthoried kar dena hai
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }
        //age sab shai paya gya tho  tab hi update karna dena 
        post.caption = req.body.caption

        await post.save()
        res.status(200).json({
            success: true,
            message: "post updated successfuly"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//post on Commnet Api
export const commnetOnPost = async (req, res) => {
    try {
        const post = await postModule.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        //check comment is Already Exist

        let commentKaIndex = -1
        post.comments.forEach((item, index) => {
            //checking item ke undar user ka id same hai ki nahi logined user se 
            if (item.user.toString() === req.user._id.toString()) {
                commentKaIndex: index
            }
        })

        if (commentKaIndex !== -1) {
            post.comments[commentKaIndex].comment = req.body.comment
            await post.save()

            return res.status(200).json({
                success: true,
                message: "Commnet Updated Successfully "
            })
        }

        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Commnet Added "
            })

        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//deleete Comment Api
export const deleteComment = async (req, res) => {
    try {
        const post = await postModule.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "post not found"
            })
        }

        //delete Comment Api agr owner delete karna chahta hai
        if (req.body.commentId == undefined) {
            return res.status(400).json({
                success: false,
                message: "comment   id is required"
            })
        }


        if (post.owner.toString() === req.user._id.toString()) {
            post.comments.forEach((item, index) => {
                //checking item ke undar user ka id same hai ki nahi logined user se 
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            });
            await post.save()

            return res.status(200).json({
                success: true,
                message: "selected comment deleted Successfully"
            })
        }
        else {
            post.comments.forEach((item, index) => {
                //checking item ke undar user ka id same hai ki nahi logined user se 
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            });
            await post.save()

            return res.status(200).json({
                success: true,
                message: "comment deleted Successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}   