import React, { useState } from 'react'
import Header from "../components/Header";
import '../styles/StudentSignup.css';
import '../styles/Form.css';
import TestFooter from '../components/TestFooter';

function StudentSignup() {
    return (
        <div>
            <Header />
            <div className='form-container'>
                <h2 className='head-label'>Student Signup</h2>
                <form>
                    <div>
                        <label htmlFor="">Username</label>
                        <input
                            type="text"
                            name='username'
                            // onChange={}
                            // value={}
                            placeholder='Username'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">First Name</label>
                        <input
                            type="text"
                            name='first_name'
                            // onChange={}
                            // value={}
                            placeholder='First name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Last Name</label>
                        <input
                            type="text"
                            name='last_name'
                            // onChange={}
                            // value={}
                            placeholder='Last name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            name='email'
                            // onChange={}
                            // value={}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            name='password'
                            // onChange={}
                            // value={}
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type='submit'>Signup</button>
                    {/* {message && <>{message}</>} */}
                </form>
            </div>
            {/* TEST FOOTER IS TEMPORARY */}
            <TestFooter />
        </div>
    )
}

export default StudentSignup
