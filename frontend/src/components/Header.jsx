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
                <Link to="/">
                    <button>Students</button>
                </Link>
                <Link to="/admin/login">
                    <button>Admins</button>
                </Link>
            </div>
        </header>
    )
}

export default Header
