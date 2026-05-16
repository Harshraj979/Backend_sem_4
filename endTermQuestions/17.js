// Write a middleware that checks the User-Agent header. If the user is on a mobile device, use Mongoose Pagination to send only 5 results, but send 20 results if they are on a desktop.
const express=require('express');
const mongoose=require('mongoose');
const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/testDB");

const userSchema=new mongoose.Schema({
    product:String,

})
const User=mongoose.model("User",userSchema);

function checkDevice(req,res,next){
    if(req.headers['user-agent'].includes('Mobile')){
        req.limit=5;
    }
    else{
        req.limit=20;
    }
    next();
}
app.get("/products",checkDevice,async(req,res)=>{
    const products=await User.find().limit(req.limit);
    res.send(products);
})
app.listen(3000);