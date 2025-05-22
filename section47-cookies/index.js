const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(`Hey there ${name}`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "Allen Diaz");
  res.cookie("animal", "Dog");
  res.send("Allen Diaz");
});
app.get("/setname", (req, res) => {});
app.listen("3000", () => {
  console.log("Localhost run on 3000");
});
