const express = require("express");
const app = express();

//database
require("./startup/database")();

//Route
require("./startup/route")(app);

//Port setup
require("./startup/port")(app);
