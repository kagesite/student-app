import React, { useState } from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/admins/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            console.log("Server response:", data);

            if (response.ok) {
                console.log("Admin Login Successful!");
                console.log("Received Token:", data.token);

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("Token stored in localStorage");
                    navigate("/admin-dash");
                }

                setFormData({
                    email: "",
                    password: "",
                });
            } else {
                console.error("Failed to login as Admin");
                alert("Failed to login as Admin");
                setFormData({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    
    
    return (
        <>
            <Header />
            <div className='form-container'>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin
