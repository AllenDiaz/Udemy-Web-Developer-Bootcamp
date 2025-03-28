const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')

    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("Oh NO MONGO ERRORRR!!")
        console.log(err)
    })


app.set('views'), path.join(__dirname, 'views');
app.set('view engine', 'ejs');

app.get('/dogs', (req, res) => {
    res.send('Woof!!')
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})