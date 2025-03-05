import React, { useState } from 'react'
import Header from '../components/Header'

function StudentLogin() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/student/login', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Login response not okay!")
                }

                return response.json();
            })
            .then(data => {
                console.log("Login successful!", data)
                setMessage("Login successful!");
                setLoginData({
                    email: "",
                    password: ""
                })
            })
            .catch(error => {
                console.error(error);
                setMessage("Error logging in:", error);
            })
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
                            value={loginData.email}
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
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default StudentLogin
