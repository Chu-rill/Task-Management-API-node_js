const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./src/routes/AuthRoutes");
const taskRoutes = require("./src/routes/TaskRoutes");
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
//import your routes
app.get("/", (req, res) => {
  res.json({ status: "success request" });
});

app.use("/task", taskRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
