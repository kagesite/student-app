import React, { useState } from 'react'
import Header from "../components/Header";
import '../styles/StudentSignup.css';
import '../styles/Form.css';
import TestFooter from '../components/TestFooter';

function StudentSignup() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3001/students/create', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                console.log("Student Registered Successfully!");
                setFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                })
            } else {
                console.error("Failed to registered student!")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <Header />
            <div className='form-container'>
                <h2 className='head-label'>Student Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            name='username'
                            onChange={handleChange}
                            value={formData.username}
                            placeholder='Username'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">First Name</label>
                        <input
                            type="text"
                            name='first_name'
                            onChange={handleChange}
                            value={formData.first_name}
                            placeholder='First name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Last Name</label>
                        <input
                            type="text"
                            name='last_name'
                            onChange={handleChange}
                            value={formData.last_name}
                            placeholder='Last name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type='submit'>Signup</button>
                    {/* {message && <>{message}</>} */}
                </form>
            </div>
            {/* TEST FOOTER IS TEMPORARY */}
            <TestFooter />
        </div>
    )
}

export default StudentSignup
