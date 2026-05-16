const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/contactDB")
    .then(()=>console.log("Mongodb connected"))
    .catch((err)=>console.log(err));

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const Contact=mongoose.model("Contact",contactSchema);

//get method
app.get("/contacts",async(req,res)=>{
    try{
        const contacts=await Contact.find();
        res.json(contacts);
    }
    catch(err){
        res.send("Error fetching the contacts");
    }
})

//post method
app.post("/contacts",async(req,res)=>{
    try{
        await Contact.create(req.body);
        res.send("contact added");
    }
    catch(err){
        res.send("Error adding the contacts");
    }
})

//PUT
app.put("/contacts/:id",async(req,res)=>{
    try{
        await Contact.findByIdAndUpdate(req.params.id,req.body);
        res.send("Contact updated");
    }
    catch(err){
        res.send("Error updating the contact");
    }
})

//delete
app.delete("/contacts/:id",async(req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id);
        res.send("Deleted the contact");
    }
    catch(err){
        res.send("Error deleting the contact");
    }
})

app.listen(3000,()=>{
    console.log("Server running");
})
