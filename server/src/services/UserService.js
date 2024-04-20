const connection = require("../models/db");

exports.getUserByEmail = async (email) => {
  const [user] = await connection.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return user;
};

exports.saveUser = async (email, username, password, verification_token) => {
  const [result] = await connection.execute(
    "INSERT INTO users (email, username, password, verification_token) VALUES (?,?,?,?)",
    [email, username, password, verification_token]
  );

  //   // Get the auto-generated user ID
  //   const userId = result.user_id;

  //      // Dynamically create a task table for the user
  // const taskTableName = `tasks_${userId}`;
  // await connection.execute(
  //   `CREATE TABLE ${taskTableName} (
  //     id INT AUTO_INCREMENT PRIMARY KEY,
  //     task_name VARCHAR(255),
  //     description TEXT,
  //     ...
  //   )`
  // );

  // //create user_tasks table
  // await connection.execute(
  //   `CREATE TABLE user_tasks (
  //     user_id INT NOT NULL,
  //     task_table_name VARCHAR(255) NOT NULL,
  //     PRIMARY KEY (user_id),
  //     FOREIGN KEY (user_id) REFERENCES users(user_id)
  // );`)

  // // Insert user-task mapping into user_tasks table
  // await connection.execute(
  //   "INSERT INTO user_tasks (user_id, task_table_name) VALUES (?, ?)",
  //   [userId, taskTableName]
  // );

  return result;
};

exports.verifyUserAccount = async (user_id) => {
  const [result] = await connection.execute(
    "UPDATE users SET is_verified = true, verification_token = NULL WHERE user_id = ?",
    [user_id]
  );
  return result;
};
