const express = require("express");
const app = express();
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
// app.use((req, res) => {
//     console.log("We got a new responds")
//     res.send('<h1>This is my webpage!</h1>')
// })

app.get('/', (req,res) => {
    res.render('home.ejs')
})

app.get('/r/:subredit', (req, res) => {
    console.log(req.params)
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit </h1>`)
})

app.get('/r/:subreddit/:postID', (req,res) => {
    console.log(req.params)
    const {subreddit, postID} = req.params

    res.send(`<h1> Viewing Post: ${subid} on the ${subreddit} subreddit `);
})

app.get('/cat', (req,res) => {
    res.send('Meow');
})

app.get('/dog', (req, res) => {
    res.send('woffff')
})

app.get('/search', (req, res) => {
    const {q} = req.query
    if(!q) {
        res.send(`<h1>Nothing found when nothing search</h1>`)
    }
    res.send(`<h1>Search result for: ${q}</h1>`)
})
app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', {rand: num})
})

app.get(/(.*)/, (req,res) => {
    res.send('Error route not found')
})


app.listen(8000 , () => {
    console.log("Listening in port 8000");  
})
