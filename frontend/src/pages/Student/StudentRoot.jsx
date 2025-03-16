import React from 'react'
import Header from '../../components/Header'
import StudentHomeSignup from '../../components/Student/StudentHomeSignup'
import StudentHomeLogin from '../../components/Student/StudentHomeLogin'
import TestFooter from '../../components/TestFooter'
import "../../styles/StudentRoot.css"

function StudentRoot() {
    return (
        <div>
            <Header />
            <div className='container'>
                <div>
                    <StudentHomeSignup />
                </div>
                <div>
                    <StudentHomeLogin />
                </div>
            </div>
            <TestFooter />
        </div>
    )
}

export default StudentRoot
