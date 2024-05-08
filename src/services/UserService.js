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
    "INSERT INTO users (email, username, password) VALUES (?,?,?)",
    [email, username, password]
  );
  return result;
};
