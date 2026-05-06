const express = require('express');
const path = require('path');
const auth = require('./middle');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.get('/authform', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'authform.html'));
});

app.post('/submit', auth, (req, res) => {
    res.send("Welcome Admin ");
});

app.listen(3000, () => {});