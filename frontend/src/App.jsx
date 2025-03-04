import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from './components/StudentSignup'
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import "./styles/index.css"


function App() {
    return (
        <Routes>
            <Route path="/" element={<UserSignup />} />

            <Route path="student-login" element={<StudentLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
        </Routes>
    )
}

export default App
