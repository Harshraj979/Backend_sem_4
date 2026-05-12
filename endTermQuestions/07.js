//write js to show different crud operations and handle each routing also implement a frontendinterface to update the quantity of products when matches the product name
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/productDB")
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send(`
        <h1>Update Product Quantity</h1>
        <form method="POST" action="/update-quantity">
            <input type="text"name="name" placeholder="Enter Product Name"required><br><br>
            <input type="number" name="quantity" placeholder="Enter New Quantity"required><br><br>
            <button type="submit">Update Quantity</button>
        </form>
    `);
});
// Update quantity using product name
app.post("/update-quantity", async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const product = await Product.findOneAndUpdate(
            { name: name },
            { quantity: quantity },
            { new: true }
        );
        if (!product) {
            res.send("Product does not exist");
        }
        else {
            res.send("Product quantity updated successfully");
        }
    }
    catch (err) {
        res.send(err.message);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});