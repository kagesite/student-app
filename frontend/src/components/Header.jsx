import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Header.css"



function Header() {
    return (
        <header className='header'>
            <a href="/">
                <h1>TK COURSES</h1>
            </a>
            <div className='btns-container'>
                <Link to="/student-login">
                    <button>Student Login</button>
                </Link>
                <Link to="/admin-login">
                    <button>Admin Login</button>
                </Link>
            </div>
        </header>
    )
}

export default Header
