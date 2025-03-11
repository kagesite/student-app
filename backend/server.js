require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3001;
const pool = require('./db');
const jwt = require('jsonwebtoken');

const path = require('path');

// MIDDLEWARE
// Have Node server the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(cors())
app.use(express.json());

// Handle GET resuqest to /api route
app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.get('/', (req, res) => {
    res.json({ message: "Server root page" });
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});