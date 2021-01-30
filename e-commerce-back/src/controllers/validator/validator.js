const { check, validationResult } = require("express-validator");
exports.signupValidation = [
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("first name must have atleast 3 characters"),
  check("lastName")
    .isLength({ min: 3 })
    .withMessage("last name must have atleast 3 characters long"),
  check("userName")
    .isLength({ min: 6 })
    .withMessage("user name must have atleast 6 characters")
    .matches(/\d/)
    .withMessage("user name must contain a number"),
  check("email").isEmail().withMessage("invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must contain atleast 6 character long"),
];

exports.signinValidation = [
  check("email").isEmail().withMessage("invalid email format"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must contain atleast 6 character long"),
];

exports.isValid = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({
      err: errors.array()[0].msg,
    });
  }
  next();
};
