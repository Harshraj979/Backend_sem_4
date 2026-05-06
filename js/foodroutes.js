const express=require('express');

let router = express.Router();

router.get("/food", (req, res) => {
    res.send("all food items....");
});

router.get("/order", (req, res) => {
    res.send("order your food here");
});

module.exports=router;