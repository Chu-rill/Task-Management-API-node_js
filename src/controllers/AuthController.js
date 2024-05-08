const bcryptjs = require("bcryptjs");
const { getUserByEmail, saveUser } = require("../services/UserService");
const randomize = require("randomatic");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

//method for creating a user
exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // check if user exists in our database
    const emailExist = await getUserByEmail(email);
    if (emailExist.length > 0) {
      // if user exists, return an error
      return res.status(400).json({
        status: false,
        data: {},
        message: "User already exists",
      });
    }
    //if user does not exist, we hash the password
    const hashed_password = await bcryptjs.hash(password, 10);
    //store user details to database.
    const user = await saveUser(email, username, hashed_password);
    if (!user) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: true,
      data: {},
      message: "Successful",
    });
    //send email to user
  } catch (error) {
    console.error(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists in our database
    const emailExist = await getUserByEmail(email);
    if (emailExist.length === 0) {
      // if user does not exists, return an error
      return res.status(400).json({
        status: false,
        data: {},
        message: "User does not exist",
      });
    }

    const user = emailExist[0]; // Assuming emailExist is an array with at most one user
    const hashedPasswordFromDB = user.password;

    // Compare the entered password with the hashed password from the database
    const passwordMatch = await bcryptjs.compare(
      password,
      hashedPasswordFromDB
    );

    if (!passwordMatch) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "Invalid email or password",
      });
    }

    const payload = {
      email,
      id: user.id,
    };

    //generate a token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    return res.status(200).json({
      status: true,
      data: {},
      message: "Successful",
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getUserFromNodeCache = async (req, res) => {
  const { email } = req.body;
  // first check if data is in cache
  let userData = myCache.get(email);
  if (!userData) {
    //fetch from database
    const userData = await getUserByEmail(email);
    if (!userData) {
      return res.status(400).json({
        status: false,
        data: {},
        message: "user not found",
      });
    }
    //store user data in cache
    myCache.set(email, userData, 600);
  }
  return res.status(200).json({
    status: true,
    data: userData,
    message: "request successful",
  });
};
