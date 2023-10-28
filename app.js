const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/FeleFashions',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
})

app.use(bodyParser.json());

app.use("/api/product",productRoutes);

app.listen(3000,()=>{
    console.log("Server started!");
});