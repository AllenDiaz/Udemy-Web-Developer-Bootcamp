const express = require("express");
const app = express();

app.use(() => {
    console.log("We got a new responds")
})

app.listen(3000, () => {
    console.log("Listening in port 3000");  
})
