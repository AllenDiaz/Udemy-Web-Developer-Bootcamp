const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')

    .then(() => {
        console.log("CONNECTION OPEN")
    })
    .catch(err => {
        console.log("Oh NOOOO ERRORRR!!")
        console.log(err)
    })

    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            maxLength: 20
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive ya dodo!']
        },
        OnSale: {
            type: Boolean,
            default: false
        },
        categories: [String],
        qty: {
            online: {
                type: Number,
                default: 0
            },
            inStore: {
                type: Number,
                default: 0
            }
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }
    
    });

    // productSchema.methods.greet = function() {
    //     console.log("HELLO  HI!!  HOWDY!!!")
    // }
    productSchema.methods.toggleOnSale = function() {
        this.OnSale = !this.OnSale;
        return this.save();
    }

    productSchema.methods.addCategory = function(newCat) {
        this.categories.push(newCat);
        return this.save();
    }

    productSchema.statics.fireSale = function() {
        return this.updateMany({}, { OnSale: true, price: 0})
    }

    const Product = mongoose.model('Product', productSchema)

    const findProduct = async () => {
        const foundProduct = await Product.findOne({ name: 'Bike Helmet' });
        // foundProduct.greet()
        // console.log(` - from ${foundProduct.name}`)
        console.log(foundProduct)
        await foundProduct.toggleOnSale();
        console.log(foundProduct) 
        await foundProduct.addCategory('Outdoors');
        console.log(foundProduct);   
    }
    Product.fireSale().then( res => console.log(res))




    // findProduct();

    // const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS' })
    // bike.save()
    // .then(data => {
    //     console.log("IT WORKED")
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log("OH NO ERROR")
    //     console.log(err)
    // })

    // Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 29}, {new: true, runValidators: true})
    // .then(data => {
    //     console.log("IT WORKED")
    //     console.log(data);
    // })

   