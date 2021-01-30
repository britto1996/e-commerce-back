const { hash } = require("bcrypt");
var User = require("../models/user");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (user || error) {
      return res.status(400).json({
        message: "user email is already registered",
      });
    }
  });
  const { firstName, lastName, userName, email, password, role } = req.body;
  const _user = new User({
    firstName,
    role,
    lastName,
    email,
    password,
    userName,
  });

  _user.save((err, data) => {
    console.log(data);
    if (err || !data) {
      //   console.log(err);
      res.status(400).json({
        err: "user data failed to save in db",
      });
    } else {
      res.status(200).json({
        message: "user data successfully saved",
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (user) {
      if (user.authenticate(req.body.password)) {
        let token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "1h",
          }
        );
        res.cookie(token, {
          secure: true,
          httponly: true,
          expire: 360000 + Date.now(),
        });
        // res.send()
        console.log(token);
        const { _id, firstName, lastName, email, role, name } = req.body;
        const userlogin = new User({
          _id,
          firstName,
          lastName,
          email,
          name,
          role,
        });
        return res.status(200).json({
          token: token,
          user: userlogin,
        });
      }
    }
    if (!user) {
      return res.status(400).json({
        err: "user failed to login check your email or password",
      });
    }
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(400).json({
      err: "invalid token",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({
        err: "can't access to the token",
      });
    }
    req.user = user;
    console.log(user);
    res.status(200).json({
      message: `welcome to ${user.email} profile`,
    });
    next();
  });
};
