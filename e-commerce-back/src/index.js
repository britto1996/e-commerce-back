const express = require("express")
const app = express()
const port = 2000
const env = require("dotenv")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRoute = require("./routes/user")

env.config()

mongoose.connect('mongodb://localhost/b-store', 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true}).then(()=>console.log("DB CONNECTED"))



app.use(bodyParser.json())

app.use("/api",userRoute)

app.listen(process.env.PORT || port,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})