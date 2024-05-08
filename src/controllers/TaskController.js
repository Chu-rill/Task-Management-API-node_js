const { addTask } = require("../services/TaskService");

exports.addTask = async (req, res) => {
  try {
    const { task, description, category } = req.body;
    console.log(req.user.id);
    //store user details to database.
    const product = await addTask(req.user.id, task, description, category);
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
