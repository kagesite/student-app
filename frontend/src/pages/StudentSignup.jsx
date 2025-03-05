import React, { useState } from 'react'
import Header from "../components/Header";

function StudentSignup() {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student"
    })
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/student/signup', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                return response.json()
            })
            .then(data => {
                console.log('Signup Successful:', data)
                setMessage("Signup successful!");
                setFormData({
                    username: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                })

            })
            .catch(error => {
                console.error("Error posting data:", error)
                setMessage("Signup Failed. Please try again.");
            })
    }

    return (
        <div>
            <Header />
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        name='username'
                        onChange={(e) => handleChange(e)}
                        value={formData.username}
                        placeholder='Username'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="">First Name</label>
                    <input
                        type="text"
                        name='firstName'
                        onChange={(e) => handleChange(e)}
                        value={formData.firstName}
                        placeholder='First name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="">Last Name</label>
                    <input
                        type="text"
                        name='lastName'
                        onChange={(e) => handleChange(e)}
                        value={formData.lastName}
                        placeholder='Last name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        name='email'
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        value={formData.password}
                        placeholder='Password'
                        required
                    />
                </div>
                <button type='submit'>Signup</button>
                {message && <>{message}</>}
            </form>
        </div>
    )
}

export default StudentSignup
