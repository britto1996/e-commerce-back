const express = require("express")
const { signup, signin, authenticateToken } = require("../../controllers/admin/user")
const router = express.Router()

// var User = require('../../models/user')

router.post('/admin/signup',signup)
router.post('/admin/signin',signin)
router.get('/admin/profile',authenticateToken)
module.exports = router
