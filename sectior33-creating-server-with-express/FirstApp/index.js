const express = require("express");
const app = express();

// app.use((req, res) => {
//     console.log("We got a new responds")
//     res.send('<h1>This is my webpage!</h1>')
// })

app.get('/', (req,res) => {
    res.send('This is the homepage')
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

app.get(/(.*)/, (req,res) => {
    res.send('Error route not found')
})


app.listen(8000 , () => {
    console.log("Listening in port 8000");  
})
