// get the mongoose dependencies
const mongoose = require('mongoose');

// defining what is structure of the schema or model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true       
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

// creating a model with the name Product as a database collection name and 
// productSchema as a structure of model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;