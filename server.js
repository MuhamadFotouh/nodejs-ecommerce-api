const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { dbConnection } = require("./config/dbConfig");
const categoryRoute = require("./routes/categoryRoute");

// DB Connection
dbConnection();

// express app
const app = express();

// Middlewares

// parse express.json
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/categories", categoryRoute);

// Unhandled routes
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  const err = new Error(`Can't find ${req.originalUrl}`);
  next(err.message);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ err });
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started listening on http://localhost:${process.env.PORT}`
  );
});
