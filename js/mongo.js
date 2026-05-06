const mongoose=require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Mongo error",err));

let productSchema=new mongoose.Schema({
    name:String,
    price:Number
});

let Product= new mongoose.model("Product", productSchema);
/*
let savedb=async()=>{
    let p1=await Product.insertOne({name:"SmartPhone",price:43000});
    let p2=await Product.insertOne({name:"Laptop",price:60000});
}
savedb();
*/
/*
let updatedb=async()=>{
    let p1=await Product.updateOne({name:ObjectId("SmartPhone")},{$set:{price:45000}});
    console.log(p1);
    updatedb();
}
*/
/*
let deletedb=async()=>{
    let p1=await Product.deleteOne({name:"Laptop"});
}
deletedb();
*/
