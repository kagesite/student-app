import React, { useState } from 'react'
import Header from '../components/Header'
import "../styles/StudentSignup.css"
import "../styles/Form.css"


function StudentSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/student/signup', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(`Success: ${data}`);
            })
            .catch(error => console.error("Error sending data", error));

        setName("");
        setEmail("");
        setPassword("");
    }



    return (
        <div>
            <Header />
            <div className="form-container">
                <h2>Student Signup</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Get Started</button>
                </form>
            </div>
        </div>
    )
}

export default StudentSignup
