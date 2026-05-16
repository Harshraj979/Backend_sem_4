//Create an Express route that intentionally throws an error and a global eroor-handling middleware that catches it and sends a 500 status
/*
const express=require('express');
const app=express();

app.get("/error",(req,res,next)=>{
    const err = new Error("Something went wrong");
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(500).send("Internal server error");
})
app.listen(3000);
*/

//Write a basic Node.js sscript that performs basic crud operations

const {Client}=require('pg');
const client=new Client({
    user:"postgres",
    host:"localhost",
    database:"shopdb",
    password:"Harsh12345@#",
    port:5432
})

client.connect()
    .then(()=>console.log("'Databse connected"))
    .catch(()=>console.log("Error"))

const insertQuery=`INSERT INTO Orders(product_name,quantity) VALUES('laptop',2)`;

client.query(insertQuery,(err,result)=>{
    if(err){
        console.log("Insert error");
    }
    else{
        console.log("saved successfully");
    }
})

const selectQuery = `SELECT * FROM Orders`;

client.query(selectQuery, (err, result) => {
    if (err) {
        console.log("Select Error");
    }
    else {
        console.log(result.rows);
    }
});

const updateQuery=`UPDATE Orders SET quantity=10 WHERE product_name = 'laptop'`;
client.query(updateQuery, (err, result) => {
    if (err) {
        console.log("Select Error");
    }
    else {
        console.log(result.rows);
    }
});

const deleteQuery = `DELETE FROM Orders WHERE product_name = 'laptop'`;
client.query(deleteQuery, (err, result) => {
    if (err) {
        console.log("Delete Error");
    }
    else {
        console.log("Record Deleted");
    }
    client.end();
});
