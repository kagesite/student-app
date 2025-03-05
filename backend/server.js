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

// Route for student signup
app.post('/student/signup', async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM testStudents WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await pool.query(
            'INSERT INTO testStudents (username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, firstName, lastName, email, hashedPassword]
        );

        res.status(201).json({ message: "Student Registered Successfully:", user: newStudent.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

app.post('/student/login'), async (req, res) => {
    const { email, password } = req.body

    try {
        const student = await pool.query('SELECT * FROM testStudents WHERE email = $1', [email]);
        if (student.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or passowrd" });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: student.rows[0].id, role: 'student' }, process.env.JWT_SECRET, {
            expiresIn: '10m'
        });

        res.json({ message: "Login successful", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

app.get('/student/dashboard', async (req, res) => {


})




app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});