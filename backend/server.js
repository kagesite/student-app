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
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET resuqest to /api route
app.post('/students/create', async (req, res) => {

    console.log(req.body);
    
    const { username, email, password, firstname, lastname, telephone, address } = req.body;

    const studentObject = req.body;

    console.log(`Firstname: ${studentObject.firstname}`);

    console.log(`Name: ${username}, Email: ${email}, Password: ${password}, Firstname: ${firstname}, Lastname: ${lastname}, Telephone: ${telephone}, Address: ${address}`);


    try {
        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use"});
        }

        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(process.env.SECRET_PASSWORD, salt, async (err, hash) => {
                hashedPassword = hash;

                const newStudent = await pool.query(
                    `INSERT INTO students (username, email, password, firstname, lastname, telephone, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`, [username, email, hashedPassword, firstname, lastname, telephone, address]
                );
        
                res.status(201).json({ message: "Student registered sucessfully"});

            });
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error"});
    }
});


//Fixed: BCRYPT COMPARE IS NOT WORKING | Most answers online indicate it is because there is problem with typing in postgres or whitespace
//Todo: add jwt to authorization and return token in an object with the success message
//I thought I had to  use the unencrypted password of the user to compare, but the password you actually use is the one in the .env file. 
app.get('/students/login', async (req, res) => {

    let userCred = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [userCred.email]);

        if (existingUser.rows.length <= 0) {
            return res.status(400).json({ message: "Incorrect Email"});
        }
        else {
            bcrypt.compare(process.env.SECRET_PASSWORD, existingUser.rows[0].password, (err, result) => {
                console.log(result);
                
                if (result === true) {
                    res.send({message: "Login Sucess"});
                }
                else {
                    res.status(403).send({message: "Incorrect Password"});
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }

});

app.get('/admins/login', (req, res) => {

});

app.get('/students/:email', async (req, res) => {

    const student_email = req.params.email;

    try {

        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [student_email]);

        if (existingUser.rows.length < 0) {
            return res.status(400).json({ message: "Email not Found"});
        }

        res.status(200).json(existingUser.rows[0]);    

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});
    }

    
});

app.put('/students/update/:email', (req, res) => {

});

app.delete('/students/delete/:email', (req, res) => {

});

app.get('/courses', async (req, res) =>  {
    try {

        const coursesArray = await pool.query('SELECT * FROM courses');
        
        if (coursesArray.rows.length <= 0) {
            return res.status(400).json({message: "Courses Table Does NOT Exist"});
        }

        res.status(200).json(coursesArray.rows);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: "Server Error"});
    }
});

app.get('/students/courses/:email', (req, res) => {

});

app.put('/students/register?email=email&string_id=course', (req, res) => {

});

app.put('/students/unregister/email=student_email&string_id=course', (req, res) => {

});

app.get('/students', async (req, res) => {

    try {

        const studentsArray = await pool.query('SELECT * FROM students');
        
        if (studentsArray.rows.length <= 0) {
            return res.status(400).json({message: "Student Table Does NOT Exist"});
        }

        res.status(200).json(studentsArray.rows);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: "Server Error"});
    }
});

app.post('/courses/create', (req, res) => {

});

app.put('/courses/update/:string_id', (req, res) => {

});

app.delete('/courses/delete/:string_id', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});