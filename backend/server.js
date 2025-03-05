require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.js');
const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

pool.connect()
    .then(() => console.log(`Connected to PostGreSQL`))
    .catch(err => console.error(`Database connection error:`, err));


// MIDDLEWARE
// Have Node server the files for our built React app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET resuqest to /api route
app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.post('/register', (req, res) => {
    
    // console.log(req.body);

   // const student = JSON.parse(req.body);

    // console.log(student);

    const sqlConfig = "INSERT INTO STUDENTS (firstname) VALUES ('Tyler')";

    pool.query(sqlConfig);

});

app.get('/', (req, res) => {
    res.json({ message: "Server root page" });
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});