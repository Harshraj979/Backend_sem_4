const express = require('express');
const cookieParser = require('cookie-parser');

let app = express();

app.use(cookieParser());

app.get('/setcookie', (req, res) => {
    res.cookie('theme', 'darktheme',{ httpOnly: true });
    res.send('Cookie has been set');
});
app.get('/fetchcookie',(req,res)=>{
    res.send(req.cookies);
    console.log(req.cookies);
})
app.get('/deletecookie',(req,res)=>{
    res.clearCookie('theme');
    res.send('Cookie deleted successfully');
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//make drop down menu using cookie