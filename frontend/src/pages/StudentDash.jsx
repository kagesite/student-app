import React, { useState, useEffect } from 'react'
import TestFooter from '../components/TestFooter'
import StudentDashHeader from '../components/StudentDashHeader'
import "../styles/StudentDash.css"
import "../styles/CourseModal.css"
import { useNavigate } from 'react-router-dom'

function StudentDash() {
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readyToRegister, setReadyToRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        course_id: ""
    })
    const navigate = useNavigate();

    // FETCHING ALL COURSES
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch('http://localhost:3001/courses', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return response.json();
            })
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    // PREVENTS PAGE SCROLLING WHILE MODAL IS OPEN
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup when modal closes
        }
    }, [isModalOpen]);


    // FORM DATA FUNCTIONS
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // REGISTERING FUNCTION
    const handleSubmit = (e, id) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        
        fetch("http://localhost:3001/students/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                console.log("Student Enrolled Successully!");
                console.log(`Token: ${token}`)
                setFormData({
                    username: "",
                    email: "",
                });
                alert("Registration Successful!")
                closeModal();
                navigate('/student-profile')
            } else {
                return response.json().then(data => {
                    console.error("Failed to enroll!", data.message);
                })
            }
        })
        .catch(error => {
            console.error("Error:", error);
        })
        
    }

    const showCourseDetails = (id) => {
        const selectedCourse = courses.find(c => c.course_id === id);
        if (selectedCourse) {
            setSelectedCourse(selectedCourse);

            setFormData(prevFormData => ({
                ...prevFormData,
                course_id: selectedCourse.course_id
            }))

            setIsModalOpen(true);
        } else {
            console.log("Course not found")
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setReadyToRegister(false);
    }

    return (
        <div>
            <StudentDashHeader />
            <main>
                <h1 className='page-title'>Student Dashboard</h1>
                <div className="course-container">
                    <ul className='course-list'>
                        {courses.map(course => {
                            return (
                                <li key={course.course_id} className='course-card'>
                                    <h3>{course.title}</h3>
                                    <hr className='bar' />
                                    <p><strong>Schedule:</strong> {course.schedule}</p>
                                    <p><strong>Credits:</strong> {course.credit_hours}</p>
                                    <p><strong>Fee:</strong> ${course.tuition_cost}</p>
                                    <button onClick={() => showCourseDetails(course.course_id)}>Learn More</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Modal for course details & Registering */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeModal}>X</button>
                            </div>
                            {readyToRegister ? (
                                <div className='registration-modal'>
                                    <h2>Register for {selectedCourse.title}</h2>
                                    <form onSubmit={handleSubmit} className='registration-form'>
                                        <div>
                                            <label>Username:</label>
                                            <input
                                                type="text"
                                                name='username'
                                                placeholder="Enter your username"
                                                onChange={handleChange}
                                                value={formData.username}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className='registration-btn'>Confirm Registration</button>
                                    </form>

                                    <div className='register-bottom'>
                                        <button className="back-btn" onClick={() => setReadyToRegister(false)}>Back</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='modal-inside'>
                                    <h2>{selectedCourse.title}</h2>
                                    <p><strong>Class ID:</strong> {selectedCourse.string_id}</p>
                                    <p><strong>Description:</strong> {selectedCourse.description}</p>
                                    <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
                                    <p><strong>Location:</strong> {selectedCourse.classroom_number}</p>
                                    <p><strong>Capacity:</strong> {selectedCourse.maximum_capacity}</p>
                                    <p><strong>Credits:</strong> {selectedCourse.credit_hours}</p>
                                    <p><strong>Fee:</strong> ${selectedCourse.tuition_cost}</p>
                                    <button className="register-btn" onClick={() => setReadyToRegister(true)} >Register</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
            <TestFooter />
        </div>
    )
}

export default StudentDash
