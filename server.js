const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/errorMiddleware");
const { dbConnection } = require("./config/dbConfig");
const categoryRoute = require("./routes/categoryRoute");

// DB Connection
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRoute);

// Unhandled routes
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware for express app
app.use(globalError);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started listening on http://localhost:${process.env.PORT}`
  );
});

// Handle rejections outside of the express app
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);

  server.close(() => {
    console.log(`Server closed!`);
    process.exit(1); // 1 denotes an err
  });
});
