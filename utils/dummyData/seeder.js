const fs = require("fs");

const dotenv = require("dotenv");
// require("colors");

const Product = require("../../models/product.model");
const { dbConnection } = require("../../config/dbConfig");

dotenv.config({ path: "../../.env" });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Inject data into DB
const injectData = async () => {
  try {
    await Product.create(products);

    console.log("Data Injected");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d/-i
if (process.argv[2] === "-i") {
  injectData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
