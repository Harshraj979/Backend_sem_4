//A user wants to update their profile. Create an Express POST route that uses express-validator to validate the input, and then uses Prisma ORM to update the record in a PostgreSQL database.

const express=require('express');
const {body,validationResult}=require('express-validator');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/profileDB")
    .then(()=>console.log("Database connected"))
    .catch(()=>console.log("Error"))


const ProfileSchema=new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    }
})

const Profile=mongoose.model("Profile",ProfileSchema);

app.post("/updateProfile",
    [
        body("id").notEmpty().withMessage("ID is required"),
        body("name").notEmpty().withMessage("Cannot be empty"),
        body("age").isInt({min:18,max:60}).withMessage("Propr age required")
    ],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.json(errors.array())
        }
        try{
            const updatedProfile= await Profile.findByIdAndUpdate(req.body.id,{
                name: req.body.name,
                age: req.body.age
            },
            {
                new:true
            }
            )
            res.json(updatedProfile);
        }
        catch(err){
            res.status(500).send("Error");
    }
})

app.listen(3000);