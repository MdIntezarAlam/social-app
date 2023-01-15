//post mai caption owner likes image and comment ka module create karna hai

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: String,

    image: {
        public_id: String,
        url: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModule" //reference of usermodule
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModule"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userModule"
            }, //reference of user modulule
            comment: {
                type: String,
                required: true
            },
        },
    ]
})
const postModule = mongoose.model("postModule", postSchema)

export default postModule