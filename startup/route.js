const express = require('express');
const users = require("../routes/users");
const posts = require("../routes/posts");
const profiles = require("../routes/profiles");
const error = require('../middleware/error');
const jsonparser = require('../middleware/middleware');
const path = require('path');

module.exports = app => {
  jsonparser(app); //express.json() middleware
  app.use('/uploads', express.static('uploads'));

  app.use("/api/users", users); //setup Users routes
  app.use("/api/posts", posts); //setup Posts routes
  app.use("/api/profiles", profiles); //setup Profile routes

  //serve our statuc file
  if (process.env.NODE_ENV === 'production') {
    console.log('production');
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  error(app); //error middleware
};
