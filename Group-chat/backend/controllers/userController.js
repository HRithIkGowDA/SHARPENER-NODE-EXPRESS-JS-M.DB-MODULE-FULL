const sequelize = require("../utils/database");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const SALT = 10;
const SECRET_KEY = process.env.SECRET_KEY;

// Model
const User = sequelize.models.user;

// Validation
const signUpValidator = (body) => {
  if (body === undefined) return false;

  return (
    validator.isEmail(body.email) &&
    body.name !== undefined &&
    body.password !== undefined &&
    body.phone !== undefined
  );
};

const loginValidator = (body) => {
  if (body === undefined) return false;

  return validator.isEmail(body.email) && body.password !== undefined;
};

// SignUp
exports.signup = (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    // 409 Conflict
    res
      .status(409)
      .json({ status: "error", message: "User is already registered." });
  } else {
    let body = req.body;

    if (signUpValidator(body)) {
      bcrypt
        .hash(body.password, SALT)
        .then(async (result) => {
          try {
            let object = await User.create({ ...body, password: result });

            res.status(201).json({
              status: "success",
              user: { id: object.id, name: object.name },
            });
          } catch (error) {
            res.json({ status: "error", message: error.errors[0].message });
          }
        })
        .catch((error) => {
          console.log(error.errors[0].message);
          res.json({ status: "error", message: error.errors[0].message });
        });
    } else {
      res.status(200).json({ status: "error", message: "Missing in Content" });
    }
  }
};

// Login
exports.login = async (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    res
      .status(409)
      .json({ status: "error", message: "User is already registered." });
  } else {
    let body = req.body;
    if (loginValidator(body)) {
      let email = body.email;
      let password = body.password;

      try {
        let user = await User.findOne({ where: { email: email } });

        if (user) {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) console.log(err);

            if (result) {
              let token = jwt.sign(
                { userId: user.id, name: user.name },
                SECRET_KEY
              );
              // This header allow browser to accept token from backend
              res.set({ "Access-Control-Expose-Headers": "token" });
              res.set("token", token);
              res
                .status(200)
                .json({
                  status: "success",
                  message: "User Logged in ...",
                  self: user.id,
                });
            } else {
              res
                .status(401) // Password is not correct
                .json({ status: "error", message: "Password is not matching" });
            }
          });
        } else {
          res.status(404).json({ status: "error", message: "User not found" });
        }
      } catch (err) {
        console.log("Error in Fetching User");
      }
    } else {
      // If body han't all fields
      res.status(200).json({ status: "error", message: "Missing in Content" });
    }
  }
};
