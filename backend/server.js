import app from "./app.js"
import connectDatabase from "./database/database.js"



connectDatabase()
app.listen(process.env.PORT, () => {
    console.log(`server is listinig on localhost ${process.env.PORT}`)
})