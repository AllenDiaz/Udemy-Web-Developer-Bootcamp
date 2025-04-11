const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('tiny'))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!! ")
    next();
} )

const auth = (req, res, next) => {
    const { password } = req.query;
    if(password === 'open') {
        next()
    }
    // res.send('sorry you need a password')
    throw new Error('Password required!')
}
// app.use((res, req, next) => {
//     console.log('This is my first middleware')
//     return next();
// })
 
// app.use((res, req, next) => {
//     console.log('This is my second middleware')
//     return next();
// })

// app.use((res, req, next) => {
//     console.log('This is my second middleware')
//     return next();
// }) 

app.get('/', auth, (req, res) => {
    console.log(`Request time date ${req.requestTime}`)
    res.send('HOME PAGE')
})

app.get('/dogs', (req, res) => {
    res.send('Woof Woof!')
})

app.get('/secret', auth, (req, res) => {
    res.send('My Secret is walking with God')
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.use((req, res) => {
    res.send('<h1 style="color:red; magin: 20 20"> Not found 404 </h1>')
})

app.use((req, res) => {
    res.status(404).send('Not Found')
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})