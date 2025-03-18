import React from 'react'

function StudentDashHeader() {
    return (
        <div>
            <header className="header">
                <a href="/admin/dashboard">
                    <h1>TK COURSES</h1>
                </a>
                <div>
                    <a href="/admin/profile"><div className='admin-header-profile'></div></a>
                </div>
            </header>
        </div>
    )
}

export default StudentDashHeader
