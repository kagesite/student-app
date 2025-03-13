require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db.js');
const app = express();
const jwt = require('jsonwebtoken');
const  {expressjwt: expressjwt}  = require('express-jwt');
const PORT = process.env.PORT || 3001;
const path = require('path');

// MIDDLEWARE
// Have Node server the files for our built React app
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle requests from client side

// Checks for student details in database to login. If credentials match in the database, returns succesful message and jwt token
app.post('/students/login', async (req, res) => {
    
    let userCred = req.body;
    
    try {
        
        const hasAtSymbol = userCred.username.includes("@");
        
        if (hasAtSymbol) {
            const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [userCred.email]);
            
            if (existingUser.rows.length <= 0) {
                return res.status(400).json({message: "No Registered Account with that Email"});
            }
            
            bcrypt.compare(userCred.password, existingUser.rows[0].password, (err, result) => {
                
                if (result === true) {
                    const token = jwt.sign({ username: userCred.username}, process.env.JWT_PASSWORD, {
                        algorithm: "HS256",
                        expiresIn: "1min"
                    });
                    res.status(200).json({message: "Login Sucess", token: token});
                }
                else {
                    res.status(403).send({message: "Incorrect Password"});
                }
            });
            
        }
        else {
            const existingUser = await pool.query('SELECT * FROM students WHERE username = $1', [userCred.username]);
            
            if (existingUser.rows.length <= 0) {
                return res.status(400).json({message: "No Registered Account with that Username"});
            }
            
            bcrypt.compare(userCred.password, existingUser.rows[0].password, (err, result) => {
                
                if (result === true) {
                    const token = jwt.sign({ username: userCred.username}, process.env.JWT_PASSWORD, {
                        algorithm: "HS256",
                        expiresIn: "1min"
                    });
                    res.status(200).json({message: "Login Sucess", token: token});
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

// Todo: It's probably best practice to encrypt admin passwords, so encrypt their password in the database
// Checks for admin details in database to login. If credentials match in the database, returns sucessful message and jwt token
app.post('/admins/login', async (req, res) => {
    
    const adminCred = req.body;

    try {

        const existingAdmin = await pool.query('SELECT * FROM admins WHERE username = $1', [adminCred.username]);

        if (existingAdmin.rows.length <= 0) {
            res.status(400).json({message: "Incorrect Username"});
        }
        else if (existingAdmin.rows[0].password !== adminCred.password) {
            res.status(400).json({message: "Incorrect Password"});
        }
        else {
            const token = jwt.sign({ username: adminCred.username}, process.env.JWT_PASSWORD, {
                algorithm: "HS256",
                expiresIn: "1min"
            });
            res.status(200).json({message: "Successful Login", token: token});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// Creates a new student in the database | Returns a sucessful or unsucessful message
app.post('/students/create', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        console.log(req.body);
        
        const { username, email, password, firstname, lastname, telephone, address } = req.body;

        //const studentDetails = req.body;

        try {
            const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
            const checkUsername = await pool.query('SELECT * FROM students WHERE username = $1', [username]);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: "Email already in use"});
            }

            if (checkUsername.rows.length > 0) {
                return res.status(400).json({ message: "Username already in use"});
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
// Searches database for a single student through the student_id search parameter | Returns found student object
app.get('/students/id/:student_id',
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}), 
    async (req, res) => {

        const studentID = req.params.student_id;

        try {

            const existingUser = await pool.query('SELECT * FROM students WHERE student_id = $1', [studentID]);

            if (existingUser.rows.length <= 0) {
                return res.status(400).json({ message: "Student not found"});
            }

            res.status(200).json(existingUser.rows[0]);    

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error"});
        }
});

// Searches database for a single student through the username search parameter | Returns found student object
app.get('/students/username/:username', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        const username = req.params.username;

        try {

            const existingUser = await pool.query('SELECT * FROM students WHERE username = $1', [username]);

            if (existingUser.rows.length <= 0) {
                return res.status(400).json({ message: "Student not found"});
            }

            res.status(200).json(existingUser.rows[0]);    

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error"});
        }
});

// Searches database for a single student through the email search parameter | Returns found student object
app.get('/students/email/:email', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        const student_email = req.params.email;

        try {

            const existingUser = await pool.query('SELECT * FROM students WHERE email = $1', [student_email]);

            if (existingUser.rows.length <= 0) {
                return res.status(400).json({ message: "Email/User not Found"});
            }

            res.status(200).json(existingUser.rows[0]);    

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error"});
        }

    
});

// Updates specified student user details by student_id | Returns a succesful update message and updated student object
app.put('/students/update/:student_id', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        const studentCred = req.body;
        const studentArray = Object.entries(studentCred);

        try {

            const checkEmail = await pool.query('SELECT * FROM students WHERE email = $1', [studentCred.email]);
            const checkUsername = await pool.query('SELECT * FROM students WHERE username = $1', [studentCred.username]);
            const checkStudentId = await pool.query('SELECT * FROM students WHERE student_id = $1', [req.params.student_id]);

            if (checkEmail.rows.length > 0) {
                return res.status(400).json({ message: "Email already in use"});
            }

            if (checkUsername.rows.length > 0) {
                return res.status(400).json({ message: "Username already in use"});
            }

            if (checkStudentId.rows.length <= 0) {
                return res.status(400).json({ message: "Email/User not Found"});
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(studentCred.password, salt, async (err, hash) => {
                    
                    hashedPassword = hash;

                    studentArray.forEach((subArray) => {

                        console.log(subArray);

                        if (subArray.includes('password')) {
                            subArray[1] = hashedPassword;
                        }
                    
                    })

                    for (let i = 0; i < studentArray.length; i++) {
                        if (studentArray[i][0] !== undefined) {
                            await pool.query('UPDATE students SET ' + studentArray[i][0] + '= $1 WHERE student_id = $2 RETURNING *', [studentArray[i][1], req.params.student_id]);  
                        }
                        else {
                            console.log("error within Student Array loop");
                        }
                    }

                    const updatedStudentUser = await pool.query('SELECT * FROM students WHERE student_id = $1', [req.params.student_id]);
                    return res.status(200).json({message: "Update Succesful", student: updatedStudentUser.rows[0]});
                    
                });
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error"});
        }

});


// Deletes a Student User by using student_id | Returns Sucessful Message with deleted student object
app.delete('/students/delete/:student_id', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {
    
    const  student_id  = req.params.student_id;

    try {

        const existingUser = await pool.query('SELECT * FROM students WHERE student_id = $1', [student_id]);

        if (existingUser.rows.length <= 0) {
            return res.status(400).json({message: "Student Account Does Not Exist"});
        }
        else  {
            const deleteStudent = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [student_id]);
            return res.status(200).json({ message: "Deletion Successful", student: deleteStudent.rows[0]});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
});

// Returns an array of all available courses as course objects
app.get('/courses', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) =>  {
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

// Returns an array of object courses that a specific student is enrolled in
app.get('/students/courses/:student_id', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        const student_id = req.params.student_id;

        try {

            const studentCourses = await pool.query('SELECT * FROM courses INNER JOIN enrollments ON courses.course_id = enrollments.course_id WHERE student_id = $1', [student_id]);

            if (studentCourses.rows.length <= 0) {
                res.status(400).json({message: "Student is not registered for any classes"});
            }
            else {
                return res.status(200).json(studentCourses.rows);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"})
        }
});

// Registers a student to a course provided the student_id and course_id in the request body || Returns succesful message and the object created in the enrollments table
app.post('/students/register', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

        const {student_id, course_id} = req.body;

        try {

            const existingRegistration = await pool.query('SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2', [student_id, course_id]);

            if (existingRegistration.rows.length > 0) {
                return res.status(400).json({message: "Student Already Enrolled in This Course"});
            }
            else {

                const studentEnrollment = await pool.query('INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *', [student_id, course_id]);
                res.status(200).json({message: "Successfully Enrolled in Course", enrollment: studentEnrollment.rows[0]});
            }


            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }

});

// Unregisters or deletes a student from a course | Returns succesful message and deleted enrollment object
app.delete('/students/unregister', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {
        const {student_id, course_id} = req.body;

        try {

            const existingEnrollment = await pool.query('SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2', [student_id, course_id]);

            if (existingEnrollment.rows.length <= 0) {
                return res.status(400).json({message: "Student is not registered to this course"});
            }
            else  {
                const deleteEnrollment = await pool.query('DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2 RETURNING *', [student_id, course_id]);
                return res.status(200).json({ message: "Unregistration Successful", unregistration: deleteEnrollment.rows[0]});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Server Error"});
        }
});

// Returns an array of all created students as student objects
app.get('/students', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {

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

// Creates a new course | Returns successful message and an object of the new course that was created
app.post('/courses/create', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {
        const newCourse = req.body;

        try {
            const existingCourse = await pool.query('SELECT * FROM courses WHERE string_id = $1', [newCourse.string_id]);

            if (existingCourse.rows.length > 0) {
                return res.status(400).json({message: "Course Already Exists"});
            }
            else {
                const insertCourse = await pool.query(`INSERT INTO courses 
                    (string_id, title, description, schedule, classroom_number, maximum_capacity, credit_hours, tuition_cost) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
                    [newCourse.string_id, newCourse.title, newCourse.description, newCourse.schedule, newCourse.classroom_number, newCourse.maximum_capacity, newCourse.credit_hours, newCourse.tuition_cost]
                );

                return res.status(200).json({message: "New Course Created", course: insertCourse.rows[0]});
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server Error"});
        }
});

// Updates a course by using course_id | Returns successful message and object of course that was updated
app.put('/courses/update/:course_id',
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {
        const updateObject = req.body;
        const courseArray = Object.entries(updateObject);

        try {

            const checkStringId = await pool.query('SELECT * FROM courses WHERE string_id = $1', [updateObject.string_id]);
            const checkCourseId = await pool.query('SELECT * FROM courses WHERE course_id = $1', [req.params.course_id]);

            if (checkStringId.rows.length > 0) {
                return res.status(400).json({ message: "Course String_Id Already in Use"});
            }

            if (checkCourseId.rows.length <= 0) {
                return res.status(400).json({ message: "Course not Found"});
            }


            for (let i = 0; i < courseArray.length; i++) {
                if (courseArray[i][0] !== undefined) {
                    await pool.query('UPDATE courses SET ' + courseArray[i][0] + '= $1 WHERE course_id = $2 RETURNING *', [courseArray[i][1], req.params.course_id]);  
                }
                else {
                    console.log("error within Course Array loop");
                }
            }

            const updatedCourse = await pool.query('SELECT * FROM courses WHERE course_id = $1', [req.params.course_id]);
            return res.status(200).json({message: "Update Succesful", student: updatedCourse.rows[0]});
            

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error"});
        }
});

// Deletes course through course_id paramater || Returns succesful message and delete course object
app.delete('/courses/delete/:course_id', 
    expressjwt({secret: process.env.JWT_PASSWORD, algorithms: ["HS256"]}),
    async (req, res) => {
        const course_id = req.params.course_id;

        try {

            const checkCourse = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

            if (checkCourse.rows.length <= 0) {
                return res.status(400).json({message: "Course Does Not Exist"});
            }
            else {
                const deletedCourse = await pool.query('DELETE FROM courses WHERE course_id = $1 RETURNING *', [course_id]);
                return res.status(200).json({message: "Course successfully deleted", course: deletedCourse.rows[0]});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Server Error"});
        }
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});