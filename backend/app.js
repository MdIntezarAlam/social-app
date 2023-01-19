import express from 'express'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })) //middleware 
app.use(cookieParser())

dotenv.config({ path: "backend/config/config.env" })
app.use("/api/v1", postRoutes)
app.use("/api/v1", userRoutes)
export default app