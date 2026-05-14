//A user wants to create a dynamic portfolio using a Node.js project initialised with npm init. You need to build an Express POST route to collect user skills, validate them using express-validator, and save the data into a MongoDB collection.

const express=require('express');
const mongoose=require('mongoose');
const {body,validationResult}=require('express-validator');

const app=express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
    .then(()=>console.log("Database connected"))
    .catch(()=>console.log("Error while connection"));

const portfolioSchema=new mongoose.Schema({
    name:{
        type: String
    },
    skills:{
        type:[String]
    }
})
const Portfolio=mongoose.model("Portfolio",portfolioSchema);

app.get("/",(req,res)=>{
    res.send(`
        <form method="POST" action="/portfolio">
            <input type="text" name="name" placeholder="Enter your name"><br><br>
            <textarea name="skills" placeholder="Enter your skills"></textarea><br><br>
            <button type="submit"> Submit</button>
        </form>
    `)
})

app.post('/portfolio',
    [
        body("name").notEmpty().withMessage("Name cannot be empty"),
        body("skills").notEmpty().withMessage("Skills cannot be empty")
    ],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.send(errors.array());
        }
    const newPortfolio=new Portfolio({
        name:req.body.name,
        skills:req.body.skills.split(",")
    })
    await newPortfolio.save();
    res.send("Portfolio saved successfully");
})

app.listen(3000);