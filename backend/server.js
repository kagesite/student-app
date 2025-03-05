require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db.js');
const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');

// MIDDLEWARE
// Have Node server the files for our built React app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET resuqest to /api route
app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.post('/register', async (req, res) => {

    console.log(req.body);
    
    const { username, email, password, firstname, lastname, telephone, address } = req.body;

    console.log(`Name: ${username}, Email: ${email}, Password: ${password}, Firstname: ${firstname}, Lastname: ${lastname}, Telephone: ${telephone}, Address: ${address}`);


    try {
        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use"});
        }

        //const hashedPassword = await bcrypt.hash(password);

        const newStudent = await pool.query(
            `INSERT INTO students (username, email, password, firstname, lastname, telephone, address)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`, [username, email, password, firstname, lastname, telephone, address]
        );

        res.status(201).json({ message: "Student registered sucessfully", user: newStudent.rows[0]});

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error"});
    }
});

app.get('/', (req, res) => {
    res.json({ message: "Server root page" });
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});