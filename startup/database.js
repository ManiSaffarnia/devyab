const mongoose = require("mongoose");
const config = require('config');

const databaseURI = (process.env.NODE_ENV === 'production') ? config.get("databaseURI") : "mongodb://localhost:27017/devyab-dev";

module.exports = () => {
  console.log(databaseURI);


  //PRODUCTION 
  if (process.env.NODE_ENV === 'production') {
    console.log('production');
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
  }
  else {
    console.log('development');
    //DEVELOPEMENT
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
  }
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
};
