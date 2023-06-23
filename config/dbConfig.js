const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(({ connection }) => {
      console.log(`connected to MongoDB: ${connection.host}`);
    })
    .catch((err) => {
      console.error(`Error connecting to MongoDB: ${err}`);
      process.exit(1); // 1 denotes an err
    });
};
