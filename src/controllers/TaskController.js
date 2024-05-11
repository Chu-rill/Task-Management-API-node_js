const {
  addTask,
  getAllTask,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../services/TaskService");

exports.addTask = async (req, res) => {
  try {
    const { task, description, category } = req.body;
    console.log(req.user.id);
    //store user details to database.
    const result = await addTask(req.user.id, task, description, category);
    if (!result) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getAllTask = async (req, res) => {
  try {
    //store user details to database.
    const result = await getAllTask(req.user.id);
    if (!result) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: result[0],
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    const products = await deleteTask(id, req.user.id);
    if (!products) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, task, description, category } = req.body;

    const product = await updateTask(
      req.user.id,
      id,
      task,
      description,
      category
    );

    if (!product) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: product,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await getSingleTask(req.user.id, id);
    if (!result) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    console.error(error);
  }
};
