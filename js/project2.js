const express = require("express");
const mongoose = require("mongoose"); //odm library

const app = express();
const PORT = 8000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/demo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: String,
  gender: String,
},
{
    timestamps:true,
});

// Model
const User = mongoose.model("User", userSchema);

// Routes

// GET all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

// CREATE user
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE user
app.patch("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
