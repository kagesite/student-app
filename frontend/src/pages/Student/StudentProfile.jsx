import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import StudentDashHeader from '../../components/Student/StudentDashHeader'
import '../../styles/Profile.css';

function StudentProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUnregisterModalOpen, setIsUnregisteredModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null) // Stores Profile Data
    const [profileCourses, setProfileCourses] = useState(null);
    const [loading, setLoading] = useState(true) // For loading state
    const [unregisterCourse, setUnregisterCourse] = useState(null);
    const [editFormData, setEditFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        telephone: "",
    })
    const [unregisterFormData, setUnregisterFormData] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setLoading(true);
            fetch('http://localhost:3001/student/profile', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setProfileData(data.user);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching profile", error);
                    setLoading(false);
                })
        } else {
            setLoading(false);
            console.log("No token found!");
        }
    }, []);

    // Get specific courses that the current student has registered for.
    useEffect(() => {
        if (profileData?.id) {
            const token = localStorage.getItem('token');

            console.log("Fethcing courses for profile ID:", profileData.id)

            if (token && profileData?.id) {
                fetch(`http://localhost:3001/students/courses/${profileData.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data)) {
                            if (data.length === 0) {
                                console.log("Student is not registered for any courses");
                                setProfileCourses([]);
                            } else {
                                setProfileCourses(data);
                            }
                        } else {
                            console.error("Expected an array of courses, but received:", data);
                            setProfileCourses([]);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching profile courses", error)
                        setProfileCourses([])
                    });
            } else {
                console.log("Waiting for profile data...")
            }
        }
    }, [profileData])

    const showEditModal = () => {
        if (profileData) {
            setEditFormData({
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                email: profileData.email || "",
                address: profileData.address || "",
                telephone: profileData.telephone || "",
            })
        }
        setIsEditModalOpen(true);
    }
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            fetch("http://localhost:3001/student/profile", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(editFormData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to update profile");
                    }

                    const updatedProfile = response.json();

                    setProfileData((prevProfile) => ({
                        ...prevProfile,
                        ...editFormData,
                    }));
                    setIsEditModalOpen(false)
                })
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    }

    const showUnregisterModal = (course) => {
        const selectedCourse = profileCourses.find(c => c.course_id === course.course_id);
        setUnregisterCourse(selectedCourse);
        setIsUnregisteredModalOpen(true);
    }
    const closeUnregisterModal = () => {
        console.log("Closing unreg modal...")
        setIsUnregisteredModalOpen(false);
        setUnregisterCourse(null);
    }
    const handleUnregisterChange = (e) => {
        const { name, value } = e.target;
        setUnregisterFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleUnregisterSubmit = async (e, course_id) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3001/students/unregister", {
                method: "DELETE",
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: unregisterFormData.username,
                    password: unregisterFormData.password,
                    course_id
                })
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to unregister")
            }
            fetchCourses();
            alert("Unregistration Successful!");
            closeUnregisterModal();
            setUnregisterFormData({ username: "", password: "" });
        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        }
    }

    const fetchCourses = () => {
        console.log("Fetching courses")
        if (!profileData?.id) return;
        const token = localStorage.getItem("token");
        if (token && profileData?.id) {
            fetch(`http://localhost:3001/students/courses/${profileData.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setProfileCourses(Array.isArray(data) ? data : []))
                .catch(error => console.error("Error fethcing profile courses", error))
        }
    }

    const showLogoutModal = () => {
        setIsLogoutModalOpen(true);
    }
    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <StudentDashHeader />
            <main>
                <h1 className='page-title'>Student Profile</h1>
                <div className="main-container">
                    <div className="profile-container">
                        <div className="profile-top">
                            <div className='student-profile-icon'></div>
                            <h3 className='profile-name'>{loading ? 'Loading...' : profileData?.username}</h3>
                            <button className='logout-btn' onClick={showLogoutModal}>Logout</button>
                            <hr className="bar" />
                        </div>
                        <div className="profile-main">
                            <div className="profile-course-container">
                                <div className="profile-heading">
                                    <h3 className=''>Courses</h3>
                                    <hr className="bar" />
                                </div>
                                <div className="profile-courses">
                                    {profileCourses?.map((course, index) => {
                                        return (
                                            <div className='profile-course' key={index}>
                                                <h3>{course.title}</h3>
                                                <button onClick={() => {
                                                    showUnregisterModal(course);
                                                }}>Unregister</button>
                                            </div>
                                        )
                                    }) || "N/A"}
                                </div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-heading">
                                    <h3 className=''>Info</h3>
                                    <hr className="bar" />
                                </div>
                                <div className="name-info">
                                    <div className="info-container">
                                        <h3>First Name</h3>
                                        <p>{profileData?.first_name || "N/A"}</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Last Name</h3>
                                        <p>{profileData?.last_name || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="contact-info">
                                    <div className="info-container">
                                        <h3>Email</h3>
                                        <p>{profileData?.email || "N/A"}</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Address</h3>
                                        <p>{profileData?.address || "N/A"}</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Telephone</h3>
                                        <p>{profileData?.telephone || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-bottom">
                            <button onClick={showEditModal}>Edit Info</button>
                        </div>
                    </div>
                </div>

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
                                            value={editFormData.first_name}
                                            placeholder='First name'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            name='last_name'
                                            onChange={handleInputChange}
                                            value={editFormData.last_name}
                                            placeholder='Last name'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="email"
                                            name='email'
                                            onChange={handleInputChange}
                                            value={editFormData.email}
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Address</label>
                                        <input
                                            type="text"
                                            name='address'
                                            onChange={handleInputChange}
                                            value={editFormData.address}
                                            placeholder='Address'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Telephone</label>
                                        <input
                                            type="phone"
                                            name='telephone'
                                            onChange={handleInputChange}
                                            value={editFormData.telephone}
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

                {isUnregisterModalOpen && (
                    <div className='modal-overlay'>
                        <div className="edit-modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeUnregisterModal}>X</button>
                            </div>
                            <h2>Unregister from course</h2>
                            <div className='edit-form-container'>
                                <form className='edit-form' onSubmit={(e) => handleUnregisterSubmit(e, unregisterCourse.course_id)}>
                                    <div>
                                        <label htmlFor="">Username</label>
                                        <input
                                            type="text"
                                            name='username'
                                            onChange={handleUnregisterChange}
                                            value={unregisterFormData.username}
                                            placeholder='Username'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Password</label>
                                        <input
                                            type="password"
                                            name='password'
                                            onChange={handleUnregisterChange}
                                            value={unregisterFormData.password}
                                            placeholder='Password'
                                            required
                                        />
                                    </div>
                                    <button type='submit'>Confirm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {isLogoutModalOpen && (
                    <div className='modal-overlay'>
                        <div className="edit-modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeLogoutModal}>X</button>
                            </div>
                            <h2>Confirm your logout</h2>
                            <div className='logout-modal-btns-container'>
                                <div className='logout-btns'>
                                    <button onClick={closeLogoutModal}>Stay</button>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </main>
        </div>
    )
}

export default StudentProfile
