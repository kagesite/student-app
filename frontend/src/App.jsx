import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import StudentLoginPage from './pages/Student/StudentLoginPage';
import StudentDash from './components/Student/StudentDash';
import AdminDash from './pages/Admin/AdminDash';
import "./styles/index.css"
import StudentProfile from './pages/Student/StudentProfile';
import StudentRoot from './pages/Student/StudentRoot';
import AdminProfile from './pages/Admin/AdminProfile';


function App() {
    return (
        <Routes>
            <Route path="/" element={<StudentRoot />} />
            <Route path="student/login" element={<StudentLoginPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="student/dashboard" element={<StudentDash />} />
            <Route path="admin/dashboard" element={<AdminDash />} />
            <Route path="student/profile" element={<StudentProfile /> } />
            <Route path="admin/profile" element={<AdminProfile /> } />
        </Routes>
    )
}

export default App
