// all authentication routes come here
const express = require("express");
const AuthController = require("../controllers/AuthController");
const validator = require("../middlewares/ValidationMiddleware");
// const authenticationMiddleware = require("../middlewares/Authenticate");
const {
  RegisterValidation,
  loginValidation,
} = require("../validations/AuthValidation");
const authRoutes = express.Router();

authRoutes.post(
  "/registerUser",
  validator.validateSchema(RegisterValidation),
  AuthController.registerUser
);

authRoutes.post(
  "/loginUser",
  validator.validateSchema(loginValidation),
  AuthController.loginUser
);

// authRoutes.delete(
//   "/deleteUser",
//   authenticationMiddleware.verifyToken,
//   AuthController.deleteUser
// );

module.exports = authRoutes;
