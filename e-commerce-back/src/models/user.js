const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10

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

userSchema.virtual('name').get(function(){
    return this.firstName + ' ' + this.lastName
})


userSchema.virtual('password').set(function(password){
    this.hash_password=bcrypt.hashSync(password,saltRounds)
})


userSchema.methods.authenticate = function authenticate(password){
    return bcrypt.compareSync(password,this.hash_password)
}

const User = mongoose.model('User',userSchema)
module.exports = User