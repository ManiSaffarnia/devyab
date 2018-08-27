const express = require("express");
const router = express.Router();

//@route   GET api/users/test
//@desc    Tests kardan functionality in route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "User test page works!"
  });
});

module.exports = router;
