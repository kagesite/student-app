require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3001;
const pool = require('./db');

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

// Route for student signup
app.post('/student/signup', async (req, res) => {
    const { name, email, password } = req.body;

    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);


    try {

        const existingUser = await pool.query('SELECT * FROM testStu WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newStudent = await pool.query(
            'INSERT INTO testStu (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]
        )

        res.status(201).json({ mesage: "Student registered sucessfully", user: newStudent.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" });
    }
})




app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});