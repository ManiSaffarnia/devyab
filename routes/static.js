const express = require("express");
const router = express.Router();
const path = require('path');

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//export
module.exports = router;
