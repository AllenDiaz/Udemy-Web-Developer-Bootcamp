const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(`Hey there ${name}`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "Allen Diaz");
  res.cookie("animal", "Dog");
  res.send("Allen Diaz");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("You signed your fruit cookie");
});

app.get("/verifyfruit", (req, res) => {
  const cookies = req.cookies;
  const fruit = req.signedCookies;
  res.send(fruit);
});
app.listen("3000", () => {
  console.log("Localhost run on 3000");
});
