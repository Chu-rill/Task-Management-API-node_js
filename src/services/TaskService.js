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

exports.getAllTask = async (id) => {
  const result = await connection.execute(
    "SELECT * FROM task WHERE user_id = ? ",
    [id]
  );
  return result;
};

exports.deleteTask = async (id, user_id) => {
  const [result] = await connection.execute(
    "DELETE FROM task WHERE  id = ? AND user_id = ?",
    [id, user_id]
  );
  return result;
};

exports.updateTask = async (user_id, id, task, description, category) => {
  const [result] = await connection.execute(
    "UPDATE task SET task = ?, description = ?,category = ? WHERE   id = ? AND user_id = ?",
    [task, description, category, id, user_id]
  );
  return result;
};

exports.getSingleTask = async (user_id, id) => {
  const result = await connection.execute(
    "SELECT * FROM task WHERE user_id = ? AND id = ?",
    [user_id, id]
  );
  return result;
};
