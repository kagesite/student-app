import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Header.css"


// THIS FILE IS TEMPORARY

function TestFooter() {
    return (
        <header className='header'>
            <div className='btns-container'>
                <Link to="/student-dash">
                    <button>Student Dash</button>
                </Link>
                <Link to="/admin-dash">
                    <button>Admin Dash</button>
                </Link>
            </div>
        </header>
    )
}

export default TestFooter
