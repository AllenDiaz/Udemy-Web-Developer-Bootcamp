const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelters.js");
const dogRoutes = require("./routes/dogs.js");
const adminRoutes = require("./routes/admin.js");

app.use("/", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Serving app on localhost");
});
