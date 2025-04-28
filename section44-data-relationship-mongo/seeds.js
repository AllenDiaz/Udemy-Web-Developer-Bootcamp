const mongoose = require('mongoose')
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')

    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("Oh NO MONGO ERRORRR!!")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

const seedProducts = [
        {
            name: 'Ruby Grapefruit',
            price: 1.99,
            category: 'fruit'
        },
        {
            name: 'Fairy Eggplant',
            price: 2.99,
            category: 'vegetable'
        },
        {
            name: 'Organic Goddess Melon',
            price: 4.99,
            category: 'fruit'
        },
        {
            name: 'Organic Mini Seedless Watermelon',
            price: 3.99,
            category: 'fruit'
        },
        {
            name: 'Organic Celery',
            price: 1.5,
            category: 'vegetable'
        },
        {
            name: 'Chocolate Whole Milk',
            price: 2.69,
            category: 'dairy'
        }
]

Product.insertMany(seedProducts)
// p.save()
    .then( res => {
        console.log(res)
    })
.catch(e => {
    console.log(e)
})