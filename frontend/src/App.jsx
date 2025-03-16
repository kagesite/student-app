import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentSignup from './components/Student/StudentHomeSignup';
import StudentLogin from './components/Student/StudentHomeLogin';
import AdminLogin from './pages/Admin/AdminLogin';
import StudentDash from './components/Student/StudentDash';
import AdminDash from './pages/Admin/AdminDash';
import "./styles/index.css"
import StudentProfile from './pages/Student/StudentProfile';
import StudentRoot from './pages/Student/StudentRoot';


function App() {
    return (
        <Routes>
            <Route path="/" element={<StudentRoot />} />
            <Route path="student-login" element={<StudentLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="student-dash" element={<StudentDash />} />
            <Route path="admin-dash" element={<AdminDash />} />
            <Route path="student-profile" element={<StudentProfile /> } />
        </Routes>
    )
}

export default App
