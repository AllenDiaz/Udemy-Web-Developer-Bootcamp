const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const productSchema = new Schema({
    name: String,
    price: Number,
    season:  {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [ { type: Schema.Types.ObjectID, ref: 'Product'} ]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany( [
//     {name: 'Water Melon', price: 4.99, season: 'Summer'},
//     {name: 'Uchiha', price: 4.99, season: 'Spring'}
// ] )

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Konoha Farm', city: 'Konoha'});
//     const naruto = await Product.findOne({ name: 'Naruto'});
//     farm.products.push(naruto);
//     await farm.save();
//     console.log(farm);
// }
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Konoha Farm' });
    const sasuke = await Product.findOne( { name: 'Sasuke' } )
    farm.products.push(sasuke);
    await farm.save();
    console.log(farm)
}

addProduct();