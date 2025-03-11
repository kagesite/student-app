import React, { useState } from 'react'
import StudentDashHeader from '../components/StudentDashHeader'
import '../styles/Profile.css';

function StudentProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUnregsiterModalOpen, setIsUnregisteredModalOpen] = useState(false);

    const showEditModal = () => {
        setIsEditModalOpen(true);
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    }

    const showUnregisterModal = () => {
        setIsUnregisteredModalOpen(true);
    }

    const closeUnregisterModal = () => {
        setIsUnregisteredModalOpen(false);
    }


    return (
        <div>
            <StudentDashHeader />
            <main>
                <h1 className='page-title'>Student Profile</h1>
                <div className="main-container">
                    <div className="profile-container">
                        <div className="profile-top">
                            <img src="/profile-avatar.png" className="profile-img" alt="" />
                            <h3 className='profile-name'>joemama02</h3>
                            <hr className="bar" />
                        </div>
                        <div className="profile-main">
                            <div className="profile-courses">
                                <div className="profile-heading">
                                    <h3 className=''>Courses</h3>
                                    <hr className="bar" />
                                </div>
                                <div className="profile-courses">
                                    <div className="profile-course">
                                        <h3>Course 1</h3>
                                        <button onClick={showUnregisterModal}>Unregister</button>
                                    </div>
                                    <div className="profile-course">
                                        <h3>Course 2</h3>
                                        <button onClick={showUnregisterModal}>Unregister</button>
                                    </div>
                                    <div className="profile-course">
                                        <h3>Course 3</h3>
                                        <button onClick={showUnregisterModal}>Unregister</button>
                                    </div>
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
                                        <p>Joe</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Last Name</h3>
                                        <p>Mama</p>
                                    </div>
                                </div>
                                <div className="contact-info">
                                    <div className="info-container">
                                        <h3>Email</h3>
                                        <p>joemama@test.com</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Address</h3>
                                        <p>123 north 456 west</p>
                                    </div>
                                    <div className="info-container">
                                        <h3>Telephone</h3>
                                        <p>123-456-7890</p>
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

                {isUnregsiterModalOpen && (
                    <div className='modal-overlay'>
                        <div className="edit-modal">
                            <div className="modal-top">
                                <button className="close-modal" onClick={closeUnregisterModal}>X</button>
                            </div>
                            <h2>Unregister from course</h2>
                            <div className='edit-form-container'>
                                <form className='edit-form'>
                                    <div>
                                        <label htmlFor="">Username</label>
                                        <input
                                            type="text"
                                            name='username'
                                            // onChange={}
                                            // value={}
                                            placeholder='Username'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Password</label>
                                        <input
                                            type="password"
                                            name='password'
                                            // onChange={}
                                            // value={}
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


            </main>
        </div>
    )
}

export default StudentProfile
