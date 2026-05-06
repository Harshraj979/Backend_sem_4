const foodRoutes = require('./foodroutes.js');
const express = require('express');
const app = express();

app.use(foodRoutes);
app.listen(3000, () => {
    console.log("Server started on port 3000");
})