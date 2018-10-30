const express = require("express");
const _ = require('lodash');
module.exports = app => {
  app.use((err, req, res, next) => {
    //TO-DO: mitoonam check konam ke json dorost ferestade beshe
    if (err.type === 'entity.parse.failed') {
      return res.status(400).send('داداش چی کار میکنی؟ یکم دقت کن مشتی، داده نامناسب فرستادی! یه داده درست بفرست سمت سرور تا عشق کنیم')
    }
    console.log(err);
    res.status(500).send('Something broke!');
  });
};
