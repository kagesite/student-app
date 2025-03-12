import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TestFooter from '../components/TestFooter'
import '../styles/AdminDash.css'

function AdminDash() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    })

    const showCoursesModal = (id) => {
        const selectedCourse = courses.find(c => c.course_id === id);
        setSelectedCourse(selectedCourse);
        setIsCoursesModalOpen(true);
    }

    const closeCourseModal = () => {
        setIsCoursesModalOpen(false);
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
                                        <h3>{course.title}</h3>
                                        <button onClick={() => showCoursesModal(course.course_id)}>Details</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="students-container">
                        test
                    </div>
                </div>

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
                                <button className="registered-students-btn" >Registered Students</button>
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
