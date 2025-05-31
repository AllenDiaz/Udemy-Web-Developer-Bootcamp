const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const Campground = require("../models/campground.js");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");
const { reviewSchema } = require("../Schemas.js");

router.get(
  "/",
  catchAsync(async (req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  validateCampground,
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    // res.send(req.body)
    // if (!req.body.campground) throw new ExpressError('Invalid Campground', 400
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");

    // const review = Review.find({});

    if (!campground) {
      req.flash("error", "Cannot find the campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find the campground");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  validateCampground,
  isLoggedIn,
  isAuthor,
  async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully update!");
    res.redirect(`/campgrounds/${id}`);
  }
);

router.delete("/:id", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully delete the campground");
  res.redirect("/campgrounds");
});

module.exports = router;
