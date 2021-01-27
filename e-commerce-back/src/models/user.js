const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    contact:{
        type:String
    },
    profile:{
        type:String
    }

},{timestamps:true})