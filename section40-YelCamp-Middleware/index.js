const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('tiny'))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
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

app.get('/', (req, res) => {
    console.log(`Request time date ${req.requestTime}`)
    res.send('HOME PAGE')
})

app.get('/dog', (req, res) => {
    res.send('Woof Woof!')
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})