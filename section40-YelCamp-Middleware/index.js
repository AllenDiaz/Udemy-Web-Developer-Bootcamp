const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('tiny'))


app.get('/', (req, res) => {
    res.send('HOME PAGE')
})

app.get('/dog', (req, res) => {
    res.send('Woof Woof!')
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})