const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/tacos', (req, res) => {
    console.log(req.body)
    res.send("GET /tacos response")
})

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })

} );

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find( c => c.id === id);
    res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment ;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect(`/comments`)
    });
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // const comment = comments.find( c => c.id === id);
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
    }
    res.redirect('/comments');
    // comments = comments.filter(c => c.id !== id);

    res.redirect('/comments')
})
    

app.post('/comments', (req, res) => { 
    const { username, comment } = req.body;
    comments.push({username, comment, id: uuid()});
    
    res.redirect('/comments');
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body
    res.send(`Ok, here are your ${qty} ${meat}`)
})

app.listen(3000, () => {
    console.log("ON PORT 3000")
})
