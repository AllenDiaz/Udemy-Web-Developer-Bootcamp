const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) => {
    const{ id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground})
})


app.get('/makecampground', async (req, res) => {
    const newCampground = Campground({title: 'for kids', price: 42, description: 'good for kids', location: 'Philippines'});
    await newCampground.save();
    res.send(newCampground);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})