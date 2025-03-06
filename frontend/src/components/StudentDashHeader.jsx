import React from 'react'

function StudentDashHeader() {
    return (
        <div>
            <header className="header">
                <a href="/student-dash">
                    <h1>My App</h1>
                </a>
                <div>
                    <a href="/student-profile">Student Profile</a>
                </div>
            </header>
        </div>
    )
}

export default StudentDashHeader
