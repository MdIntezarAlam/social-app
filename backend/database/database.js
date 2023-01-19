import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect("mongodb://localhost:27017/social-media-app", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Database is connected Successfully")
    } catch (error) {
        console.log("database is not connected", error)
    }
}
export default connectDatabase