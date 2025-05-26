const express = require("express");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
// const user = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/auth");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

const sessionConfig = {
  secret: "notagoodsecret",
};

app.use(session(sessionConfig));

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const user = new User({
    username,
    password,
  });
  await user.save();
  req.session.user_id = User._id;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  console.log(foundUser);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    return res.redirect("/secret");
  } else {
    res.redirect("/login");
  }
});

app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Serving your app!");
});
