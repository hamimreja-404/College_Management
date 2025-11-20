import React, { useState } from 'react';
// import DashboardLayout from '/components/layout/DashboardLayout.jsx';
import Header from '/components/layout/Header.jsx';
import ProfilePanel from '../components/panels/ProfilePanel.jsx';
import Sidebar from '../Components/layout/Sidebar';
const DashboardLayout = ({ children, navLinks, activeView, setActiveView }) => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Sidebar navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};
const studentNavLinks = [
    { id: 'profile', label: 'My Profile' },
];

const mockStudentUser = {
    name: 'Alamin Sardar',
    email: 'alamin.sardar@aliah.edu',
    role: 'Student',
    collegeName: 'Aliah University',
};

export default function StudentDashboardPage() {
    // Student view is always 'profile'
    const [activeView, setActiveView] = useState('profile');

    return (
        <DashboardLayout
            navLinks={studentNavLinks}
            activeView={activeView}
            setActiveView={setActiveView}
        >
            <Header title="My Profile" userName={mockStudentUser.name} userRole={mockStudentUser.role} collegeName={mockStudentUser.collegeName} />
            <div className="mt-8">
                <ProfilePanel user={mockStudentUser} />
            </div>
        </DashboardLayout>
    );
}
