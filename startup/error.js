const winston = require("winston");

winston.add(winston.transports.File, { filename: "logfile.log" }); //baraye neveshtan dar file
//winston.add(winston.transports.File, { filename: "logfile.log" }); //baraye neveshran dar database

process.on("uncaughtException", ex => {
  console.log(`Mani! We got a Uncaught Exception: ${ex}`);
  winston.error(ex.message, ex);
  process.exit(1);
}); //in faghat ba synchronous code ha kar mikone

process.on("unhandledRejection", ex => {
  console.log(`Mani! We got a Unhandled Rejection: ${ex}`);
  winston.error(ex.message, ex);
  process.exit(1);
}); //in ba Asynch ha va promise haye handle nashode kar mikone
