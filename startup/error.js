const winston = require("winston");

module.exports = () => {
  winston.add(winston.transports.File, { filename: "logfile.log" }); //baraye neveshtan dar file
  //winston.add(winston.transports.File, { filename: "logfile.log" }); //baraye neveshran dar database ta badan anjam bedam

  process.on("uncaughtException", ex => {
    console.log(`Mani! We got a Uncaught Exception: ${ex}`);
    new winston.transports.File({ filename: 'uncaughtExceptions.log' });
    process.exit(1);
  }); //in faghat ba synchronous code ha kar mikone

  process.on("unhandledRejection", ex => {
    console.log(`Mani! We got a Unhandled Rejection: ${ex}`);
    new winston.transports.File({ filename: 'unhandledRejection.log' });
    winston.log(ex.message, ex);
    process.exit(1);
  }); //in ba Asynch ha va promise haye handle nashode kar mikone

}