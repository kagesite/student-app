import React from 'react'
import Header from '../components/Header'
import "../styles/StudentSignup.css"
import "../styles/Form.css"


function StudentSignup() {

    return (
        <div>
            <Header />
            <div className="form-container">
                <h2>Student Signup</h2>
                <form target='#'>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            placeholder='Password'
                        />
                    </div>
                    <button type="submit">Get Started</button>
                </form>
            </div>
        </div>
    )
}

export default StudentSignup
