import React, { useEffect, useState } from 'react'
import AdminDashHeader from '../../components/Admin/AdminDashHeader'
import TestFooter from '../../components/TestFooter'
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin/AdminDash.css'

function AdminDash() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
    const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [addStudentFormData, setAddStudentFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
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
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, [])

    // FETCHINGNG ALL STUDENTS
    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token);
        fetch('http://localhost:3001/students', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
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
        const editStudent = students.find(student => student.id === id);
        setEditStudent(editStudent);
        console.log(editStudent.username);


        // if (editStudent) {
        //     setEditProfileData({
        //         first_name: editStudent.first_name || "",
        //         last_name: editStudent.last_name || "",
        //         email: editStudent.email || "",
        //         address: editStudent.address || "",
        //         telephone: editStudent.telephone || "",
        //     })

        // }
        setIsCoursesModalOpen(false);
        setIsEditModalOpen(true);
    }
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }

    const showAddStudentModal = () => {
        setIsAddStudentModalOpen(true);
    }
    const closeAddStudentModal = () => {
        setIsAddStudentModalOpen(false);
    }

    const handleAddStudentChange = (e) => {
        const { name, value } = e.target;
        setAddStudentFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/students/create', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(addStudentFormData)
            })

            const data = await response.json();

            if (response.ok) {
                console.log("Admin registered student successfully", data);
                setAddStudentFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                })
                navigate('/admin/dashboard');
                fetchStudents();
                setIsAddStudentModalOpen(false);
            } else {
                console.error("Admin failed to register student!",);
                // alert
                setAddStudentFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchStudents = () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            fetch('http://localhost:3001/students', {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Students api returned:", data); // DEBUGGING
                    setStudents(data);
                })
                .catch(error => console.error("Error fetching students:", error));
        } catch (error) {

        }
    }


    return (
        <div>
            <AdminDashHeader />
            <main>
                <h1 className='page-title'>Admin Dashboard</h1>
                <div className="admin-container">
                    <div className="courses-container">
                        <div className='course-container-head'>
                            <h2>All Courses</h2>
                            <div>
                                <button>+</button>
                            </div>
                        </div>
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
                        <div className="student-container-head">
                            <h2>All Students</h2>
                            <div>
                                <button onClick={showAddStudentModal}>+</button>
                            </div>
                        </div>
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
                                <form className='edit-form' onSubmit={handleFormSubmit}>
                                    <div>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            name='first_name'
                                            onChange={handleInputChange}
                                            value={editProfileData.first_name}
                                            placeholder='First name'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            name='last_name'
                                            onChange={handleInputChange}
                                            value={editProfileData.last_name}
                                            placeholder='Last name'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="email"
                                            name='email'
                                            onChange={handleInputChange}
                                            value={editProfileData.email}
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Address</label>
                                        <input
                                            type="text"
                                            name='address'
                                            onChange={handleInputChange}
                                            value={editProfileData.address}
                                            placeholder='Address'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Telephone</label>
                                        <input
                                            type="phone"
                                            name='telephone'
                                            onChange={handleInputChange}
                                            value={editProfileData.telephone}
                                            placeholder='Telephone'
                                        />
                                    </div>
                                    <button type='submit'>Confirm</button>
                                    {/* {message && <>{message}</>} */}
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {isAddStudentModalOpen && (
                    <div className='modal-overlay'>
                        <div className="edit-modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeAddStudentModal}>X</button>
                            </div>
                            <h2>Add Student</h2>
                            <div className='edit-form-container'>
                                <form className="edit-form" onSubmit={handleAddStudentSubmit}>
                                    <div>
                                        <label htmlFor="">Username</label>
                                        <input
                                            type="text"
                                            name='username'
                                            onChange={handleAddStudentChange}
                                            value={addStudentFormData.username}
                                            placeholder='Username'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            name='first_name'
                                            onChange={handleAddStudentChange}
                                            value={addStudentFormData.first_name}
                                            placeholder='First name'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            name='last_name'
                                            onChange={handleAddStudentChange}
                                            value={addStudentFormData.last_name}
                                            placeholder='Last name'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="text"
                                            name='email'
                                            onChange={handleAddStudentChange}
                                            value={addStudentFormData.email}
                                            placeholder='Email'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Password</label>
                                        <input
                                            type="password"
                                            name='password'
                                            onChange={handleAddStudentChange}
                                            value={addStudentFormData.password}
                                            placeholder='Password'
                                            required
                                        />
                                    </div>
                                    <button type='submit'>Add Student</button>
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
