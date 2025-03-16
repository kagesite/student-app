import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header';

function StudentLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3001/students/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json()
            // console.log(response);

            if (response.ok) {
                console.log("Login successful!");
                console.log("Received Token", data.token);
                
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("Token stored in localStorage");
                    // Automatically redirect to student dashboard
                    navigate('/student-dash')
                }
                
                console.log(formData);
                setFormData({
                    username: "",
                    password: "",
                })
            } else {
                console.error("Failed to login");
                alert("Failed to login")
                setFormData({
                    username: "",
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
                        <label>Username:</label>
                        <input
                            type="text"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='Username'
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
                    {/* <Link to="/student-dash"> */}
                        <button type="submit">Login</button>
                    {/* </Link> */}
                </form>
            </div>
        </>
    )
}

export default StudentLogin
