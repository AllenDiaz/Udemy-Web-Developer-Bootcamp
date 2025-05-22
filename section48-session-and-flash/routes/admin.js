const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("SORRY NOT AN ADMIN!");
});

router.get("/topsecrets", (req, res) => {
  res.send("This is the top secret");
});
router.get("/deleteeverything", (req, res) => {
  res.send("deleted");
});

module.exports = router;
