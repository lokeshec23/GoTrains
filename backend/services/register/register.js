const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const result = dotenv.config({ path: "./.env" });

if (result.error) {
  console.error("Error loading .env file:", result.error);
}


const app = express();
app.use(express.json());

let users = []; // Temporary database substitute

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully!" });
});

app.listen(process.env.PORT_REGISTER, () => {
  console.log(`Register service running on port ${process.env.PORT_REGISTER}`);
});
