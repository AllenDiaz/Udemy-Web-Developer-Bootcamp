const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware.js");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", async (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      // console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),

  async (req, res) => {
    req.flash("success", "Welcome Back ");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);

router.get("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
    req.flash("success", "You succesfully logout");
    res.redirect("/login");
  });
});

module.exports = router;
