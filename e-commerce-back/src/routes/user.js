const express = require("express")
const router = express.Router()

router.post('/signup',(req,res)=>{
 return res.json({
        message:"user registered successfully"
    })
})

router.post('/signin',(req,res)=>{
    return res.json({
        message:"user login successfully"
    })
})
module.exports = router
