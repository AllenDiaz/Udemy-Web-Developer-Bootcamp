const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.get("/", (req, res) => {
  res.send("Session management is active");
});

app.get("/setsession", (req, res) => {
  req.session.user = { name: "Allen", role: "Developer" };
  res.send("Session data has been set!");
});

//get session
app.get("/getsession", (req, res) => {
  // Ensure session.user exists before accessing properties
  const user = req.session.user || {};
  const name = user.name || "unknown"; //if this false get value
  const role = user.role || "unknown";

  res.send(`So you are ${name} and you are a ${role} `);
});

app.get("/signin", (req, res) => {
  const { username } = req.query;
  req.session.username = username;
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.send(`welcome ${req.session.username || "unknown"}`);
});

app.listen("3000", () => {
  console.log("Localhost run on 3000");
});
