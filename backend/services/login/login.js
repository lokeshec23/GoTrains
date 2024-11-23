const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config({ path: "./.env" });

if (result.error) {
  console.error("Error loading .env file:", result.error);
}


const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // In real-world, validate email and password from database
  if (email === "test@example.com" && password === "password123") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

app.listen(process.env.PORT_LOGIN, () => {
  console.log(`Login service running on port ${process.env.PORT_LOGIN}`);
});
