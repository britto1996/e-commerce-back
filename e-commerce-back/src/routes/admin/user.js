const express = require("express");
const {
  signup,
  signin,
  authenticateToken,
} = require("../../controllers/admin/user");
const {
  signupValidation,
  isValid,
  signinValidation,
} = require("../../controllers/validator/validator");
const router = express.Router();

// var User = require('../../models/user')

router.post("/admin/signup", signupValidation, isValid, signup);
router.post("/admin/signin", signinValidation, isValid, signin);
router.get("/admin/profile", authenticateToken);
module.exports = router;
