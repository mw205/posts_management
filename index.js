const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const usersRouter = require("./routes/usersRouter.js");
const postsRouter = require("./routes/postsRouter.js");

const app = express();

const port = 3000;
app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use((err, req, res, next) => {
  console.error("❌ Error: ", err);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
