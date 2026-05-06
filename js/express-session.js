const session=require('express-session');
const express=require('express');
let app=express();

app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mySecretKey',        // required
    resave: false,                // don't save if nothing modified
    saveUninitialized: false      // don't create empty sessions
}));

app.get('/',(req,res)=>{
    res.send(
        `
        <h2>Login</h2>
        <form method="POST" action="/login">
            Username: <input type="text" name="username"  required/><br><br>
            Password: <input type="password" name="password"  required/><br><br>
            <button type="submit">Login</button>
        </form>
        `
    )
});

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    if(username==="harsh" && password==="12345"){
        req.session.username=username;
        res.redirect('/dashboard');
    }
    else{
        res.send('Invalid credentials');
    }
});

app.get('/dashboard',(req,res)=>{
    if(req.session.username){
        res.send(`
            <h2>Welcome ${req.session.username}</h2>
            <p>You are successfully logged in.</p>
            <a href="/logout">Logout</a>
        `);
    } 
    else{
        res.send("Please login first");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(3000,()=>{});

//create a session having username and pass after logging in there should be another thing being done in there like read the contents of file
