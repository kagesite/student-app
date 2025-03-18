import React from 'react'

function StudentDashHeader() {
    return (
        <div>
            <header className="header">
                <a href="/student/dashboard">
                    <h1>TK COURSES</h1>
                </a>
                <div>
                <a href="/student/profile"><div className='student-header-profile'></div></a>
                </div>
            </header>
        </div>
    )
}

export default StudentDashHeader
