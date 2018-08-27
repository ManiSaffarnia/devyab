const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = () => {
  mongoose
    .connect(keys.databaseURI)
    .then(() => {
      console.log("connected to the db...");
    })
    .catch(error => {
      console.log(
        `there is a problem with connecting to the database: ${error}`
      );
    });
};
