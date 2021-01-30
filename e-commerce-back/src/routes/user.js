const express = require("express");
const { signup, signin, authenticateToken } = require("../controllers/user");
const {
  signupValidation,
  isValid,
  signinValidation,
} = require("../controllers/validator/validator");
const router = express.Router();
// var User = require('../models/user')

router.post("/signup", signupValidation, isValid, signup);
router.post("/signin", signinValidation, isValid, signin);
router.get("/profile", authenticateToken);
module.exports = router;
