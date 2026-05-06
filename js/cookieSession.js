const express=require('express');
let app= express();
const cookiesession=require('cookie-session')
app.use(cookiesession({
    name:"mynewsession",
    keys:["key1","key2"],
    maxAge:80000
}));

app.get("/login",(req,res)=>{
    req.session.username= "ayush"
    res.redirect("/dashboard")
})

app.get("/dashboard",(req,res)=>{
    if(req.session.username){
        res.send(`welcome! ${req.session.username},this is ur dashboard`)
    }
    else{
        res.send("please login first")
    }
})
app.listen(3000)