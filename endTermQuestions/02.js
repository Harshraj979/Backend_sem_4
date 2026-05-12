const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productDB")
    .then(()=>"mongodb connected")
    .catch((err)=>console.log(err));

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const Product=mongoose.model("Product",productSchema);

app.get("/",(req,res)=>{
    res.send(`
        <h1>Add Product</h1>
        <form action="/add-product" method="POST">
            <input type="text" name="name" placeholder="Enter Name of Product" required><br><br>
            <input type="number" name="quantity" placeholder="Enter Quantity" required><br><br>
            <button type="submit">Add Product</button>
        </form>
        <a href="/low-stock">Visit Low Stock Products</a>
        `
    )
})

app.post("/add-product",async(req,res)=>{
    try{
        await Product.create({
            name:req.body.name,
            quantity:req.body.quantity
        })
        res.send(`
            <h2>Product Added Successfully</h2>
            <a href="/">Go Back</a>
        `);
    }
    catch(err){
        res.send("Error Adding product");
    }
})

app.get("/low-stock",async(req,res)=>{
    try{
        const products=await Product.find({
            quantity:{$lt:10}
        })
        let output="<h1>Low Stock Products</h1>";
        products.forEach((product)=>{
            output+=`
                <div>
                    <h3>${product.name}</h3>
                    <p>Quantity: ${product.quantity}</p>
                </div>
            `
        })
        res.send(output);
    }
    catch(err){
        res.send("Error fetching products");
    }
})

app.listen(3000);