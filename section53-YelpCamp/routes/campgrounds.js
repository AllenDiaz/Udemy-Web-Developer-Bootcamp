const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync.js");
const multer = require("multer");
const upload = multer({ dest: "upload" });

const Campground = require("../models/campground.js");

const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

// .post(isLoggedIn, validateCampground, campgrounds.createCampground);
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("It worked");
  });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    validateCampground,
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
