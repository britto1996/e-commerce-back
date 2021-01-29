const express = require("express")
const { signup, signin, authenticateToken } = require("../controllers/user")
const router = express.Router()
// var User = require('../models/user')

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/profile',authenticateToken)
module.exports = router
