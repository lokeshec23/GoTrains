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
const JWT_SECRET = process.env.JWT_SECRET; // JWT from .env file
const cheerio = require('cheerio');
const axios = require('axios');
app.use(bodyParser.json());

// Allow requests from your frontend's origin
app.use(cors({ origin: "*" }));

// MongoDB connection
let db;
MongoClient.connect(MONGO_URI)
  .then((client) => {
    db = client.db();
    console.log(
      "******************Connected to MongoDB**************************"
    );
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
      return res
        .status(400)
        .json({ status: 400, message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = { username, email, password: hashedPassword };
    await db.collection("users").insertOne(newUser);

    res
      .status(201)
      .json({ status: 200, message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid email or password.", status: 400 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid email or password.", status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry
    );

    res.status(200).json({
      status: 200,
      message: "Login successful.",
      token, // Return token to the client
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});


const getList = async () => {
  try {
    const { data } = await axios.get('https://en.wikipedia.org/wiki/List_of_railway_stations_in_India');
    const $ = cheerio.load(data);

    const stations = [];
    $('table.wikitable tbody tr').each((index, element) => {
      const name = $(element).find('td:nth-child(2)').text().trim();
      const code = $(element).find('td:nth-child(3)').text().trim();

      if (name && code) {
        stations.push({ name, code });
      }
    });

    return stations;
  } catch (error) {
    console.error('Error scraping station data:', error);
    return [];
  }
};

app.get('/getStationList', async (req, res) => {
  const stations = await getList();
  res.json(stations);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} :)`);
});
