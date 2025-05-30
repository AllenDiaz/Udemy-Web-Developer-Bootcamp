const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const Product = require('./models/product');
const methodOverride = require('method-override');
const AppError = require('./appError');
const wrapAsync = require('./utils/wrapAsync');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')

.then(() => {
    console.log("MONGO CONNECTION OPEN")
})
.catch(err => {
    console.log("Oh NO MONGO ERRORRR!!")
    console.log(err)
})

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method')) 
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const categories = ['fruit', 'vegetable', 'dairy']
app.get('/products', async (req, res, next) => {
    try {
        const { category } = req.query;
        if(category) {
            const products = await Product.find({ category })
            res.render('products/index', { products, category})
        } else {
            const products = await Product.find({})
            res.render('products/index', { products, category: 'all' })
        }
    } catch(e) {
        next(e);
    }
})

app.get('/products/new',(req, res) => {
    // throw new AppError('Not Allowed', 402);
    res.render('products/new', {categories})
})

// adding or creating new object and go to created Object
app.post('/products', async (req, res, next) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        console.log(newProduct)
        res.redirect(`/products/${newProduct.id}`)
    }
    catch(e) {
        next(e);    
    }
})

app.get('/products/:id', wrapAsync(async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product) {
           throw new AppError('Product not found', 404);
        }
            res.render('products/show', { product })
    // console.log(product)
}));

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findById(id)
        if(!product) {
            throw new AppError('Product not found', 404);
         }
        res.render('products/edit', { product, categories })

}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect(`/products/${product.id}`,)
}))
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
    
})

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation Failed....${err.message}`, 404)
}

app.use((err, req, res, next) => {
    if(err === "ValidationError") err = handleValidationErr(err)
    next(err);
})
app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message); 
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})