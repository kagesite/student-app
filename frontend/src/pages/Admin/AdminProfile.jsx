import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminDashHeader from '../../components/Admin/AdminDashHeader'
import '../../styles/Profile.css';

function AdminProfile() {
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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setLoading(true);
            fetch('http://localhost:3001/admin/profile', {
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


    const showLogoutModal = () => {
        setIsLogoutModalOpen(true);
    }
    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    }

    return (
        <div>
            <AdminDashHeader />
            <main>
                <h1 className='page-title'>Admin Profile</h1>
                <div className="main-container">
                    <div className="profile-container">
                        <div className="profile-top">
                            <div className='admin-profile-icon'></div>
                            <h3 className='profile-name'>{loading ? 'Loading...' : profileData?.username}</h3>
                            <button className='logout-btn' onClick={showLogoutModal}>Logout</button>
                            <hr className="bar" />
                        </div>
                        <div className="profile-main">
                            <div className="profile-info">
                                <div className="profile-heading">
                                    <h3 className=''>Info</h3>
                                    <hr className="bar" />
                                </div>
                                <div className="name-info">
                                    <div className="info-container">
                                        <h3>Username</h3>
                                        <p>{profileData?.username || "N/A"}</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Email</h3>
                                        <p>{profileData?.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



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

export default AdminProfile
