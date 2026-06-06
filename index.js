const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const usersRouter = require("./routes/usersRouter.js");
const postsRouter = require("./routes/postsRouter.js");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT } = process.env;

const app = express();

const port = PORT;

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
const errorHandler = require("./middlewares/error_handler.js");
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running on port ${port}...`);
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB...");
  });
});
