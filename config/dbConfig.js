const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then(({ connection }) => {
    console.log(`connected to MongoDB: ${connection.host}`);
  });
};
