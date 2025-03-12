import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TestFooter from '../components/TestFooter'
import '../styles/AdminDash.css'

function AdminDash() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
    const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // FETCHING ALL COURSES
    useEffect(() => {
        fetch('http://localhost:3001/courses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, [])

    // FETCHINGNG ALL STUDENTS
    useEffect(() => {
        fetch('http://localhost:3001/students')
            .then(response => response.json())
            .then(data => {
                console.log("Students api returned:", data); // DEBUGGING
                setStudents(data);
            })
            .catch(error => console.error("Error fetching students:", error));
    }, [])

    const showCoursesModal = (id) => {
        const selectedCourse = courses.find(c => c.course_id === id);
        setSelectedCourse(selectedCourse);
        setIsCoursesModalOpen(true);
    }
    const closeCourseModal = () => {
        setIsCoursesModalOpen(false);
    }

    const showStudentsModal = (id) => {
        const selectedStudent = students.find(s => s.id === id);
        setSelectedStudent(selectedStudent);
        setIsStudentsModalOpen(true);
    }
    const closeStudentModal = () => {
        setIsStudentsModalOpen(false);
    }

    const showEditModal = (id) => {
        setIsCoursesModalOpen(false);
        setIsEditModalOpen(true);
    }
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }



    return (
        <div>
            <Header />
            <main>
                <h1 className='page-title'>Admin Dashboard</h1>
                <div className="admin-container">
                    <div className="courses-container">
                        <h2>All Courses</h2>
                        <ul className='courses-list'>
                            {courses.map(course => {
                                return (
                                    <li key={course.course_id} className='course-item'>
                                        <h3><span>{course.string_id}:</span>{course.title}</h3>
                                        <button onClick={() => showCoursesModal(course.course_id)}>Details</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="students-container">
                        <h2>All Students</h2>
                        <ul className='students-list'>
                            {students.map(student => {
                                return (
                                    <li key={student.id} className='student-item'>
                                        <div className='student-info'>
                                            <p><span>ID: {student.id}</span>{student.first_name} {student.last_name}</p>
                                        </div>
                                        <button onClick={() => showStudentsModal(student.id)}>Details</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* COURSES INFO MODAL */}
                {isCoursesModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeCourseModal}>X</button>
                            </div>
                            <div className='modal-inside'>
                                <h2>{selectedCourse.title}</h2>
                                <p><strong>Class ID:</strong> {selectedCourse.string_id}</p>
                                <p><strong>Description:</strong> {selectedCourse.description}</p>
                                <p><strong>Schedule:</strong> {selectedCourse.schedule}</p>
                                <p><strong>Location:</strong> {selectedCourse.classroom_number}</p>
                                <p><strong>Capacity:</strong> {selectedCourse.maximum_capacity}</p>
                                <p><strong>Credits:</strong> {selectedCourse.credit_hours}</p>
                                <p><strong>Fee:</strong> ${selectedCourse.tuition_cost}</p>
                                <button className="view-enrollment-btn" >View Enrollment</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* STUDENTS INFO MODAL */}
                {isStudentsModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeStudentModal}>X</button>
                            </div>
                            <div className='student-modal-inside'>
                                <h2>{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                                <hr className='student-modal-bar' />
                                <ul className='student-modal-info'>
                                    <li><strong>Username:</strong> {selectedStudent.username}</li>
                                    <li><strong>First Name:</strong> {selectedStudent.first_name}</li>
                                    <li><strong>Last Name:</strong> {selectedStudent.last_name}</li>
                                    <li><strong>Email:</strong> {selectedStudent.email}</li>
                                    <li><strong>Address:</strong> {selectedStudent.address}</li>
                                    <li><strong>Telephone:</strong> {selectedStudent.telephone}</li>
                                </ul>
                                <div className="profile-bottom">
                                    <button onClick={showEditModal}>Edit Info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* EDIT STUDENT INFO MODAL */}
                {isEditModalOpen && (
                    <div className='modal-overlay'>
                        <div className="edit-modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeEditModal}>X</button>
                            </div>
                            <h2>Edit Profile Info</h2>
                            <div className='edit-form-container'>
                                <form className='edit-form'>
                                    <div>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            name='first_name'
                                            // onChange={}
                                            // value={}
                                            placeholder='First name'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            name='last_name'
                                            // onChange={}
                                            // value={}
                                            placeholder='Last name'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Address</label>
                                        <input
                                            type="text"
                                            name='email'
                                            // onChange={}
                                            // value={}
                                            placeholder='Email'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Telephone</label>
                                        <input
                                            type="text"
                                            name='email'
                                            // onChange={}
                                            // value={}
                                            placeholder='Email'
                                            required
                                        />
                                    </div>
                                    <button type='submit'>Confirm</button>
                                    {/* {message && <>{message}</>} */}
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <TestFooter />
        </div>
    )
}

export default AdminDash
