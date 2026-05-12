const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

let app = express();

app.use(express.static(path.join(__dirname, '..')));
app.use(cookieParser());
app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light';
    res.send(`
        <html>
        <head>
        <link rel="stylesheet" href="/css/theme.css">
        </head>
        <body class="${theme}">
            <h1>Theme Switcher</h1>
            <a href='/switchtheme'>
                <button>Switch Theme</button>
            </a>
        </body>
        </html>
    `);
});

app.get('/switchtheme', (req, res) => {
    const currentTheme = req.cookies.theme || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    res.cookie('theme', newTheme, { httpOnly: true });
    res.redirect('/');
});

app.listen(3000, () => {});