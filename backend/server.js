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

// Handle requests from client side

// Creates a new student in the database | Returns a sucessful or unsucessful message
// Todo: check if username is already in use
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
            bcrypt.hash(password, salt, async (err, hash) => {
                hashedPassword = hash;

                const newStudent = await pool.query(
                    `INSERT INTO students (username, email, password, firstname, lastname, telephone, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [username, email, hashedPassword, firstname, lastname, telephone, address]
                );
        
                res.status(201).json({ message: "Student registered sucessfully", student: newStudent.rows[0]});

            });
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error"});
    }
});


// Todo: add jwt for authorization and return a token in an object with the success message
// Todo: Check if they are either logging in with their email or username
app.get('/students/login', async (req, res) => {

    let userCred = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [userCred.email]);
        const existingUserUsername = await pool.query('SELECT * FROM students WHERE username = $1', userCred.username);

        if (existingUser.rows[0].email !== userCred.email) {
            return res.status(400).json({ message: "Incorrect Email"});
        }
        else if (existingUser.rows[0].username !== userCred.username) {
            return res.status(400).json({message: "Incorrect Username"})
        }
        else {
            bcrypt.compare(userCred.password, existingUser.rows[0].password, (err, result) => {
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

// Searches database for a single student through the student_id search parameter | Returns found student object
app.get('/students/id/:student_id', async (req, res) => {

    const studentID = req.params.student_id;

    try {

        const existingUser = await pool.query('SELECT * FROM students WHERE student_id = $1', [studentID]);

        if (existingUser.rows.length < 0) {
            return res.status(400).json({ message: "Student not found"});
        }

        res.status(200).json(existingUser.rows[0]);    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }

    
});

// Searches database for a single student through the username search parameter | Returns found student object
app.get('/students/username/:username', async (req, res) => {

    const username = req.params.username;

    try {

        const existingUser = await pool.query('SELECT * FROM students WHERE username = $1', [username]);

        if (existingUser.rows.length < 0) {
            return res.status(400).json({ message: "Student not found"});
        }

        res.status(200).json(existingUser.rows[0]);    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }

    
});

// Searches database for a single student through the email search parameter | Returns found student object
app.get('/students/email/:email', async (req, res) => {

    const student_email = req.params.email;

    try {

        const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [student_email]);

        if (existingUser.rows.length < 0) {
            return res.status(400).json({ message: "Email/User not Found"});
        }

        res.status(200).json(existingUser.rows[0]);    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }

    
});

// Todo: check if updated username or email conflicts with already existing data in the database. There can be no duplicate usernames and emails.
// Todo: If they are changing their password, you need to encrypt their new password.
// Todo: Is there are better way of dynamically updating a student user without receving the whole object and updating everything?
app.put('/students/update/:student_id', async (req, res) => {

    const { username, email, password, firstname, lastname, telephone, address} = req.body;

    if (password !== undefined) {



    }
    else {
        res.status(400).json({message: "password is undefined"});
    }


    try {

        const existingUser = await pool.query('UPDATE students SET username = $1, email = $2, password = $3, firstname = $4, lastname = $5, telephone = $6, address = $7 WHERE student_id = $8 RETURNING *', 
            [username, email, password, firstname, lastname, telephone, address, req.params.student_id]);

        if (existingUser.rows.length < 0) {
            return res.status(400).json({ message: "Email/User not Found"});
        }

        res.status(200).json({message: "Update Succesful", student: existingUser.rows[0]});    

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }

});

app.delete('/students/delete/:student_id', (req, res) => {

});

// Returns an array of all available courses as course objects
app.get('/courses', async (req, res) =>  {
    try {

        const coursesArray = await pool.query('SELECT * FROM courses ORDER BY course_id ASC');
        
        if (coursesArray.rows.length <= 0) {
            return res.status(400).json({message: "Courses Table Does NOT Exist"});
        }

        res.status(200).json(coursesArray.rows);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({messsage: "Server Error"});
    }
});

app.get('/students/courses/:student_id', (req, res) => {

});

app.put('/students/register?student_id=id&course_id=course', (req, res) => {

});

app.put('/students/unregister/student_id=id&course_id=course', (req, res) => {

});

// Returns an array of all created students as student objects
app.get('/students', async (req, res) => {

    try {

        const studentsArray = await pool.query('SELECT * FROM students ORDER BY student_id ASC');
        
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

app.put('/courses/update/:course_id', (req, res) => {

});

app.delete('/courses/delete/:course_id', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});