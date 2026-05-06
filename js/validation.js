const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const {body,validationResult}=require('express-validator');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "..", "html", "validation.html"));
})
app.post("/submit",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage('Enter valid email'),
        body("password").isLength({min:5,max:10}).withMessage("Password must be atleast 6 characters and atmax 10 characters long")
    ],
    (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const ErrorMessages=errors.array().map(err=>err.msg);
            return res.send(ErrorMessages);
        }
        res.send("form submitted successfully");
    }
)
app.listen(3000,()=>{
    console.log("Server started");
})