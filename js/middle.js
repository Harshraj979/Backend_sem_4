function auth(req, res, next) {
    if (req.body.email === "admin@123.com" && req.body.password === "admin123") {
        console.log("welcome admin");
        next();
    } else {
        console.log("Invalid credentials");
        res.send("Invalid credentials");
    }
}

module.exports = auth; 