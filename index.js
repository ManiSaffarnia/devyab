const express = require("express");
const app = express();

//database
require("./startup/database")();

//middleware
require("./middleware/middleware")(app);

//Route
require("./startup/route")(app);

//Port setup
require("./startup/port")(app);
