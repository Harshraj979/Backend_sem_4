const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

//! GET method to fetch all products
app.get('/products', async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } 
    catch (err){
        res.status(500).send('Failed to fetch products');
    }
});

//! POST method to add new product
app.post('/products', async (req, res) => {
    try {
        await Product.create(req.body);
        res.status(201).send('Product added');
    }
    catch (err) {
        res.status(500).send('Failed to add product');
    }
});

//! PUT method to update exisiting product
app.put('/products/:id', async (req,res)=>{
    try{ 
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send('Product updated');
    }
    catch(err){
        res.status(500).send('Failed to update product');
    }
});

//! DELETE method to delete exisiting product
app.delete('/products/:id', async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.send('Product deleted');
    } 
    catch (err){
        res.status(500).send('Failed to delete product');
    }
});

app.listen(3000);