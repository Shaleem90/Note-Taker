
const express = require("express");
const path = require("path");
const fs = require("fs");

// Setting up Express
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Access to styles.css and index.js
app.use(express.static(path.join(__dirname, 'public')));





// Port Listening on server
app.listen(PORT, function() {
    console.log("SERVER IS LISTENING ON PORT: " + PORT);
  });