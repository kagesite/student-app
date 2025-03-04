import React from 'react'
import Header from './Header'

function UserSignup() {

    return (
        <div>
            <Header />
            <div className="form-container">
                <h2>Student Signup Page</h2>
                <form>
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
                </form>
            </div>
        </div>
    )
}

export default UserSignup
