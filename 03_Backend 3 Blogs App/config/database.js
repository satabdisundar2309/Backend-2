const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB Connection successful");
    })
    .catch((err) => {
      console.log("Problem in DB Connection");
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
