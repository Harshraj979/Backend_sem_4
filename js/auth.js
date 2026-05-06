const express = require('express');
const app = express();
const auth = require('./middle.js'); 
const PORT = 3000;

app.get('/user', auth, (req, res) => {
    res.send("welcome admin");
});

app.listen(PORT, () => {
    console.log(`Server started`);
});