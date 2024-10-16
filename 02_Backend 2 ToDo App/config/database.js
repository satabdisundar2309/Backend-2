const mongoose = require("mongoose");
// ? Now in order to use the elements in the .env file we need to have dotenv packlage in our our project. "npm i dotenv"
require("dotenv").config(); //this line will load all the data in .env file into the "process" object
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
