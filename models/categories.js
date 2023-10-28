const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    categoryID:{
        type:Number,
        unique:true,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    }
})

categorySchema.pre('save',async function(next){
    const totalCategory = await Category.countDocuments();
    this.categoryID = totalCategory+1;
    next();
})

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;