const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../Schemas");
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const catchAsync = require("../utils/catchAsync.js");
// const Review = require("./models/review.js");

const validateReview = (req, res, next) => {
  //validating the schema
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created a new review");
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Succesfully deleted");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
