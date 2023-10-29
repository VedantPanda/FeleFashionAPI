require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL,{
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

app.listen(PORT,()=>{
    console.log("Server started!");
});