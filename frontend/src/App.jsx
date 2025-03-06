import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentDash from './pages/StudentDash';
import AdminDash from './pages/AdminDash';
import "./styles/index.css"
import StudentProfile from './pages/StudentProfile';


function App() {
    return (
        <Routes>
            <Route path="/" element={<StudentSignup />} />
            <Route path="student-login" element={<StudentLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="student-dash" element={<StudentDash />} />
            <Route path="admin-dash" element={<AdminDash />} />
            <Route path="student-profile" element={<StudentProfile /> } />
        </Routes>
    )
}

export default App
