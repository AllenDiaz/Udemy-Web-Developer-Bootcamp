const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
  res.send("Hi Allen");
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
