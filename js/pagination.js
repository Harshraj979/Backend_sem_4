const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 2;

  const products = await Product.find().skip((page - 1) * limit).limit(limit);
  res.send(products);
});

app.listen(3000);