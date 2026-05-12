//create a node js application to calculate sum of n natural numbers entered by user and store it in result.txt file display appropriate message on console

const express=require('express');
const fs=require('fs');
const app=express();
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send(`
        <form method="POST" action="/calculate">
            <h1>Sum of n natural numbers</h1>
            <input type="text" name="name" placeholder="Enter numbers">
            <button type="submit">Calculate Sum</button>
        </form>
        `)
})
app.post("/calculate",(req,res)=>{
    let data=req.body.name;
    let numbers=data.split(',');
    let sum=0;
    numbers.forEach((num)=>{
        sum+=parseInt(num);
    })
    res.send(`Sum of the numbers is: ${sum}`);
    fs.writeFile("result.txt",sum.toString(),(err)=>{
        if(err){
            console.log("Error while writing in file");
        }
        else{
            console.log("Sum calculated and stored in result.txt");
        }
    })
})
app.listen(4000);

//write a js program to create 2 arrays with 5 element each  combine them and display the resukt on console

let arr1=[1,2,3,4,5];
let arr2=[6,7,8,9,10];

let res=arr1.concat(arr2);
console.log(res);