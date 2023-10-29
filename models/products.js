const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    categoryId:{
        type:Number,
        required:true,
    },
    productId:{
        type:Number,
        unique:true
    }
})

productSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId', // Field in the Product model
    foreignField: 'categoryId', // Field in the Category model
    justOne: true, // Indicates that it's a single document reference
});

productSchema.pre('save',async function(next){
    try{
        const totalProducts = await Product.countDocuments();
        this.productId = totalProducts+1;
        next();
    }
    catch(err){
        next(err);
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;