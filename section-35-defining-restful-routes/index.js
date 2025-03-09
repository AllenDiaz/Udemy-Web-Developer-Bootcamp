const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set(express.static(path.join(__dirname, 'public') ))

app.get('/tacos', (req, res) => {
    console.log(req.body)
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {

    const { meat, qty} = req.body
    res.send(`Ok, here are your ${qty} ${meat}`)
})

app.listen(3000, () => {
    console.log("ON PORT 3000")
})
