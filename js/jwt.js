const jwt=require('jsonwebtoken');
const express=require('express');
const app=express();
app.use(express.json());

let SECRET="secret123";

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    if(username==="admin" && password==="password"){
        const token=jwt.sign(
            {username},
            SECRET,
            {expiresIn:'1h'}
        );
        return res.send({token});
    }
    else{
        return res.status(401).send('Invalid credentials');
    }
})

app.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        else{
            return res.send(`Welcome to the dashboard, ${user.username}!`);
        };
    });
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})