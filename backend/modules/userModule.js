// user ka name, email, password, avatar , post folower, following
//dono odule mai reference oposite mai dena hai

import mongoose from "mongoose";
import bcrypt from 'bcrypt' //hashingg the password in bcrypt form
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter name please"]
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Enter email please"],
        unique: [true, "email already exist"],
    },
    password: {
        type: String,
        required: [true, "Enter password please"],
        minlength: [6, "password  must be atleast 6 character"],
        select: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "postModule"
        }, //reference of post modulle
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModule"
        }, //reference of user modulule
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModule"
        }, //reference of user modulule
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
//hsahing password
//bcrypt karne ke leye jo bhee  shmema banaye hai usko and pre mthd call karna hai 
//same code ko likhna hai any project
const saltRounds = 10;
userSchema.pre("save", async function (next) {
    //agar password mdified hota hai thab hsdhing karna hai
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

//bcrypt kar ke phir se compare karna hai cookie mai store kar ke
//matchpassword wala mthd login mai bana hai
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//token ko generate karna hai ye wala mthd login mai bana hai
userSchema.methods.generateToken = function () {
    //register user ka id and secrete ko dena hai
    return jwt.sign({ _id: this._id }, process.env.SECRETE_JWT)
}



//resetPassworToken ke leye method 
userSchema.methods.getResetpasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    // console.log(resetToken)


    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000



    return resetToken
}

const userModule = mongoose.model("userModule", userSchema)
export default userModule