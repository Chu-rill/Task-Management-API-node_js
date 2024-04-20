const joi = require("joi");

exports.RegisterValidation = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
