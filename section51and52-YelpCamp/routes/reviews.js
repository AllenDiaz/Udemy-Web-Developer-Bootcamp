const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const catchAsync = require("../utils/catchAsync.js");
// const Review = require("./models/review.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created a new review");
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Succesfully deleted");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
