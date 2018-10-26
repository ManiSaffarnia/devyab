const express = require("express");

module.exports = app => {
  app.use((err, req, res, next) => {
    //TO-DO: mitoonam check konam ke json dorost ferestade beshe
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
