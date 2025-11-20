import React, { useState } from 'react';
// import DashboardLayout from 'components/layout/DashboardLayout.jsx';
import Header from 'components/layout/Header.jsx';
import StudentManagementPanel from 'components/panels/StudentManagementPanel.jsx';
import ProfilePanel from 'components/panels/ProfilePanel.jsx';
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
const adminNavLinks = [
    { id: 'students', label: 'Students' },
    { id: 'profile', label: 'My Profile' },
];

const mockAdminUser = {
    name: 'John Doe',
    email: 'john.doe@aliah.edu',
    role: 'Admin',
    collegeName: 'Aliah University',
};

export default function AdminDashboardPage() {
    const [activeView, setActiveView] = useState('students'); // Default view

    const renderContent = () => {
        switch (activeView) {
            case 'students':
                return (
                    <>
                        <Header title="Student Management" userName={mockAdminUser.name} userRole={mockAdminUser.role} collegeName={mockAdminUser.collegeName} />
                        {/* Admin can add and edit students */}
                        <div className="mt-8"><StudentManagementPanel canAddOrEdit={true} /></div>
                    </>
                );
            case 'profile':
                 return (
                    <>
                        <Header title="My Profile" userName={mockAdminUser.name} userRole={mockAdminUser.role} collegeName={mockAdminUser.collegeName} />
                        <div className="mt-8"><ProfilePanel user={mockAdminUser} /></div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout
            navLinks={adminNavLinks}
            activeView={activeView}
            setActiveView={setActiveView}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

