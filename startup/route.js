const index = require("../routes/index");
const users = require("../routes/users");
const posts = require("../routes/posts");
const profiles = require("../routes/profiles");
const error = require('../middleware/error');
const jsonparser = require('../middleware/middleware');

module.exports = app => {
  jsonparser(app); //express.json() middleware

  app.use("/", index); //test route
  app.use("/api/users", users); //setup Users routes
  app.use("/api/posts", posts); //setup Posts routes
  app.use("/api/profiles", profiles); //setup Profile routes

  error(app); //error middleware
};
