const connection = require("../models/db");

exports.addTask = async (user_id, task, description, category) => {
  user_id = user_id !== undefined ? user_id : null;
  task = task !== undefined ? task : null;
  description = description !== undefined ? description : null;
  category = category !== undefined ? category : null;
  const [result] = await connection.execute(
    "INSERT INTO task (user_id,task,description,category) VALUES (?,?,?,?)",
    [user_id, task, description, category]
  );
  return result;
};
