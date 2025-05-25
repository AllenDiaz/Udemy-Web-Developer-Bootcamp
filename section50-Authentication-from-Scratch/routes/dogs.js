const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Dogs Barking");
});

module.exports = router;
