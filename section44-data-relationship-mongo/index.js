const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const AppError = require('./AppError');
const AppError = require('./appError');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});


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
    res.status(401)
    throw new AppError('password required', 401)
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

app.get('/admin', (req, res) => {
    throw new AppError('You not an Admin', 403)
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

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Listening to port 3000')

})