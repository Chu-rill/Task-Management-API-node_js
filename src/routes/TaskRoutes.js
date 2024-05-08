// all authentication routes come here
const express = require("express");
const TaskController = require("../controllers/TaskController");
const validator = require("../middlewares/ValidationMiddleware");
const authenticationMiddleware = require("../middlewares/Authenticate");
const { AddTaskValidation } = require("../validations/TaskValidation");
const taskRoutes = express.Router();

taskRoutes.post(
  "/addTask",
  authenticationMiddleware.verifyToken,
  validator.validateSchema(AddTaskValidation),
  TaskController.addTask
);

taskRoutes.get(
  "/getAllTask",
  authenticationMiddleware.verifyToken,
  TaskController.getAllTask
);

taskRoutes.delete(
  "/delete",
  authenticationMiddleware.verifyToken,
  TaskController.deleteTask
);

taskRoutes.put(
  "/update",
  authenticationMiddleware.verifyToken,
  TaskController.updateTask
);

taskRoutes.get(
  "/getSingleTask",
  authenticationMiddleware.verifyToken,
  TaskController.getSingleTask
);

module.exports = taskRoutes;
