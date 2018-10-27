const express = require("express");
const app = express();


//error-logging
//require("./startup/error")();

//database
require("./startup/database")();

//Routes setup-> startup/route 
require("./startup/route")(app);

//Port setup -> startup/port
require("./startup/port")(app);
