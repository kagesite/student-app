import React, { useState, useEffect } from 'react'
import TestFooter from '../components/TestFooter'
import StudentDashHeader from '../components/StudentDashHeader'
import "../styles/StudentDash.css"
import "../styles/CourseModal.css"

function StudentDash() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readyToRegister, setReadyToRegister] = useState(false);

    const courses = [
        {
            id: 1,
            code: "CSCI-1001",
            name: "Introduction to Computer Science",
            description: "This course introduces students to the fundamental concepts behind computers and computer programming. Topics include basic programming logic, algorithm development, computer architecture, and software engineering.",
            schedule: "MWF 9-10",
            location: "LAB-123",
            capacity: 2,
            credits: 3,
            fee: 900.00
        },
        {
            id: 2,
            code: "CSCI-2001",
            name: "Data Structures",
            description: "This course covers the basics of data structures, algorithms, and data manipulation. Topics include linked lists, stacks, queues, trees, and hash tables. Students will also learn algorithms for sorting and searching data.",
            schedule: "TTH 10-11",
            location: "LAB-456",
            capacity: 30,
            credits: 3,
            fee: 900.00
        },
        {
            id: 3,
            code: "CSCI-2003",
            name: "Computer Architecture",
            description: "This course provides an overview of modern computer systems. Topics include assembly language, memory, CPU, and input/output devices.",
            schedule: "MWF 8-9",
            location: "LAB-789",
            capacity: 20,
            credits: 3,
            fee: 900.00
        },
        {
            id: 4,
            code: "CSCI-3001",
            name: "Operating Systems",
            description: "This course provides an introduction to the design and implementation of modern operating systems. Topics include processes, threads, memory management, file systems, and system security.",
            schedule: "TTH 1-2:30",
            location: "LAB-101",
            capacity: 25,
            credits: 3,
            fee: 900.00
        },
        {
            id: 5,
            code: "CSCI-1001",
            name: "Introduction to Computer Science",
            description: "This course introduces students to the fundamental concepts behind computers and computer programming. Topics include basic programming logic, algorithm development, computer architecture, and software engineering.",
            schedule: "MWF 9-10",
            location: "LAB-123",
            capacity: 2,
            credits: 3,
            fee: 900.00
        },
        {
            id: 6,
            code: "CSCI-2001",
            name: "Data Structures",
            description: "This course covers the basics of data structures, algorithms, and data manipulation. Topics include linked lists, stacks, queues, trees, and hash tables. Students will also learn algorithms for sorting and searching data.",
            schedule: "TTH 10-11",
            location: "LAB-456",
            capacity: 30,
            credits: 3,
            fee: 900.00
        },
        {
            id: 7,
            code: "CSCI-2003",
            name: "Computer Architecture",
            description: "This course provides an overview of modern computer systems. Topics include assembly language, memory, CPU, and input/output devices.",
            schedule: "MWF 8-9",
            location: "LAB-789",
            capacity: 20,
            credits: 3,
            fee: 900.00
        },
        {
            id: 8,
            code: "CSCI-3001",
            name: "Operating Systems",
            description: "This course provides an introduction to the design and implementation of modern operating systems. Topics include processes, threads, memory management, file systems, and system security.",
            schedule: "TTH 1-2:30",
            location: "LAB-101",
            capacity: 25,
            credits: 3,
            fee: 900.00
        }
    ];


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



    const showCourseDetails = (id) => {
        const course = courses.find(c => c.id === id);
        setSelectedCourse(course)
        setIsModalOpen(true);
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
                                <li key={course.id} className='course-card'>
                                    <h3>{course.name}</h3>
                                    <hr className='bar' />
                                    <p><strong>Schedule:</strong> {course.schedule}</p>
                                    <p><strong>Credits:</strong> {course.credits}</p>
                                    <p><strong>Fee:</strong> ${course.fee.toFixed(2)}</p>
                                    <button onClick={() => showCourseDetails(course.id)}>Learn More</button>
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
                                    <h2>Register for {selectedCourse.name}</h2>
                                    <form className='registration-form'>
                                        <div>
                                            <label>Username:</label>
                                            <input type="text" placeholder="Enter your name" required />
                                        </div>
                                        <div>

                                            <label>Email:</label>
                                            <input type="email" placeholder="Enter your email" required />
                                        </div>
                                        <button type="submit" className='registration-btn'>Confirm Registration</button>
                                    </form>

                                    <div className='register-bottom'>
                                        <button className="back-btn" onClick={() => setReadyToRegister(false)}>Back</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='modal-inside'>
                                    <h2>{selectedCourse.name}</h2>
                                    <p><strong>Code:</strong> {selectedCourse.code}</p>
                                    <p><strong>Description:</strong> {selectedCourse.description}</p>
                                    <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
                                    <p><strong>Location:</strong> {selectedCourse.location}</p>
                                    <p><strong>Capacity:</strong> {selectedCourse.capacity}</p>
                                    <p><strong>Credits:</strong> {selectedCourse.credits}</p>
                                    <p><strong>Fee:</strong> ${selectedCourse.fee}</p>
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
