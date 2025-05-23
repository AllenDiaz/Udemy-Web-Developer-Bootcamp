const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync.js");
const Campground = require("../models/campground.js");
const { campgroundSchema } = require("../Schemas.js");
const ExpressError = require("../utils/ExpressError.js");

const validateCampground = (req, res, next) => {
  //validating the schema
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  validateCampground,
  catchAsync(async (req, res, next) => {
    s;
    // res.send(req.body)
    // if (!req.body.campground) throw new ExpressError('Invalid Campground', 400)

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

module.exports = router;
