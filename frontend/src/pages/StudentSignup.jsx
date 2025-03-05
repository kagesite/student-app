import React, { useState } from 'react'
import Header from "../components/Header";

function StudentSignup() {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

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
            .then(response => response.json())
            .catch(error => console.error("Error posting data"));


        setFormData({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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
                    />
                </div>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default StudentSignup
