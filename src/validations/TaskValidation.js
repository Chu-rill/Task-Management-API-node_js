const joi = require("joi");

exports.AddTaskValidation = joi.object({
  task: joi.string().required(),
  description: joi.string().required(),
  category: joi.string().required(),
});
