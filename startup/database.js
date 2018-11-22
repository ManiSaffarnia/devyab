const mongoose = require("mongoose");
const config = require('config');

const databaseURI = config.get("databaseURI");

module.exports = () => {
  console.log(databaseURI);
  mongoose
    .connect(databaseURI, { useNewUrlParser: true })
    .then(() => {
      console.log("connected to the db...");
    })
    .catch(error => {
      console.log(
        `there is a problem with connecting to the database: ${error}`
      );
      throw new Error(`Mani! there is a problem with connecting to the database: ${error}`);
    });
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
};
