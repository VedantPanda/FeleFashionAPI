const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/products');
const CategoriesModel = require('../models/categories');
const {validateApiKey} = require('../middleware');

router.get("/category",validateApiKey,async(req,res)=>{
    const categories = await CategoriesModel.find({}).select({_id:0});
    try{
        res.json({totalCategories:categories.length,categories});
    }
    catch(err){
        res.status(500).json({message:'Error Occurred'});
    }
});

router.get("/list",validateApiKey,async(req,res)=>{
    const categoryId = Number(req.query.categoryId);
    try {
        const result = await ProductsModel.aggregate([
            {
              $match: { categoryId },
            },
            {
              $lookup: {
                from: 'categories', // The name of the Category collection
                localField: 'categoryId',
                foreignField: 'categoryID',
                as: 'category',
              },
            },
            {
              $unwind: '$category',
            },
            {
              $group: {
                _id: { categoryId: '$category.categoryID', categoryName: '$category.categoryName' },
                products: {
                  $push: {
                    productId: '$productId',
                    productName: '$productName',
                    price: '$price',
                    productImage: '$productImage',
                    brand: '$brand',
                  },
                },
              },
            },
            {
                $project: {
                  _id: 0,
                  categoryId: '$_id.categoryId',
                  categoryName: '$_id.categoryName',
                  products: 1,
                },
              }
        ]);
        res.json(result);
    }
    catch(error){
        res.status(500).json({message:"Error has occurred",error:error.message});
    }
});

router.post("/save",validateApiKey,async(req,res)=>{
    const {productName,price,productImage,brand,categoryId} = req.body;
    try{
        const category = await CategoriesModel.findOne({categoryID:categoryId});
        if(!category){
            return res.status(404).json({message:'Entered category id does not exist'});
        }
        const product = new ProductsModel({productName:productName,price:parseInt(price),productImage:productImage,brand:brand,categoryId:categoryId});
        await product.save();
        res.json({message:"Product Saved Successfully"});
    }
    catch(err){
        res.status(500).json({message:'Error saving the product'});
    }
});

module.exports = router;