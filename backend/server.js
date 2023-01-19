import app from "./app.js"
import connectDatabase from "./database/database.js"
import cloudinary from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secrete: process.env.CLOUDINARY_API_SECRET
})

connectDatabase()
app.listen(process.env.PORT, () => {
    console.log(`server is listinig on localhost ${process.env.PORT}`)
})