require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");
const usersRouter = require("./routes/usersRouter.js");
const postsRouter = require("./routes/postsRouter.js");
const donationRouter = require("./routes/donationRouter.js");
const errorHandler = require("./middlewares/errorHandler.js");

const mongoose = require("mongoose");
const { limiter } = require("./middlewares/index.js");

const { PORT } = process.env;

const app = express();

const port = PORT;
// app level middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
// app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/donations", donationRouter);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running on port ${port}...`);
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB...");
  });
});
