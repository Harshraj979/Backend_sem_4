const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Product = mongoose.model('Product', {
  name: String,
  price: Number
});

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB connection error:', err));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'crud1.html'));
});

app.post('/add', async (req, res) => {
  try {
    await new Product({
      name: req.body.name,
      price: Number(req.body.price)
    }).save();

    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to add product');
  }
});

app.get('/show', async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/update', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      price: Number(req.body.price)
    });

    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to update product');
  }
});

app.post('/delete', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to delete product');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});