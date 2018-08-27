const index = require("../routes/index");
const users = require("../routes/users");
const posts = require("../routes/posts");
const profiles = require("../routes/profiles");

module.exports = app => {
  app.use("/", index);
  app.use("/api/users", users); //setup Users routes
  app.use("/api/posts", posts); //setup Posts routes
  app.use("/api/profiles", profiles); //setup Profile routes
};
