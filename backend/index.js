const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());

// Allow requests from your frontend's origin
app.use(cors({ origin: "*" }));

// MongoDB connection
let db;
MongoClient.connect(MONGO_URI)
  .then((client) => {
    db = client.db();
    console.log("******************Connected to MongoDB**************************");
  })
  .catch((err) => console.error(err));

// Register Route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      return res.status(400).json({ status:400, message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = { username, email, password: hashedPassword };
    await db.collection("users").insertOne(newUser);

    res.status(201).json({status:200, message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} :)`);
});
