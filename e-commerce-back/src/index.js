const express = require("express")
const app = express()
const port = 2000
const env = require("dotenv")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const adminRoute = require("./routes/admin/user")

env.config()

mongoose.connect('mongodb://localhost/b-store', 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true}).then(()=>console.log("DB CONNECTED"))



app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api",userRoute)
app.use("/api",adminRoute)

app.listen(process.env.PORT || port,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})