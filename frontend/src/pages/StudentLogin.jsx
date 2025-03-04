import React from 'react'
import Header from '../components/Header'

function StudentLogin() {
    return (
        <>
            <Header />
            <div className='form-container'>
                <h2>Student Login</h2>
                <form>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default StudentLogin
