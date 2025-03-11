import React, { useState } from 'react'
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
                            name='email'
                            // value={}
                            // onChange={}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            // value={}
                            // onChange={}
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
