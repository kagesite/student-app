import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function StudentLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3001/students/login', {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Login successful!");
                setFormData({
                    email: "",
                    password: "",
                })
            } else {
                console.error("Failed to login");
                alert("Failed to login")
                setFormData({
                    email: "",
                    password: "",
                })
            }
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            <Header />
            <div className='form-container'>
                <h2>Student Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <Link to="/student-dash">
                        <button type="submit">Login</button>
                    </Link>
                </form>
            </div>
        </>
    )
}

export default StudentLogin
