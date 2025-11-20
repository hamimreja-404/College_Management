import React, { useState } from 'react';
// import DashboardLayout from 'components/layout/DashboardLayout.jsx';
import Header from 'components/layout/Header.jsx';
import AdminManagementPanel from 'components/panels/AdminManagementPanel.jsx';
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
const superAdminNavLinks = [
    { id: 'admins', label: 'Admins' },
    { id: 'students', label: 'Students' },
    { id: 'profile', label: 'My Profile' },
];

const mockSuperAdminUser = {
    name: 'Super Admin',
    email: 'super@globeskills.com',
    role: 'Super Admin',
};

export default function SuperAdminDashboardPage() {
    const [activeView, setActiveView] = useState('admins'); // Default view

    const renderContent = () => {
        switch (activeView) {
            case 'admins':
                return (
                    <>
                        <Header title="Admin Management" userName={mockSuperAdminUser.name} userRole={mockSuperAdminUser.role} />
                        <div className="mt-8"><AdminManagementPanel /></div>
                    </>
                );
            case 'students':
                return (
                    <>
                        <Header title="All Student Records" userName={mockSuperAdminUser.name} userRole={mockSuperAdminUser.role} />
                        {/* Super Admin can view and toggle status, but not add or edit student details */}
                        <div className="mt-8"><StudentManagementPanel canAddOrEdit={false} /></div>
                    </>
                );
            case 'profile':
                 return (
                    <>
                        <Header title="My Profile" userName={mockSuperAdminUser.name} userRole={mockSuperAdminUser.role} />
                        <div className="mt-8"><ProfilePanel user={mockSuperAdminUser} /></div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout
            navLinks={superAdminNavLinks}
            activeView={activeView}
            setActiveView={setActiveView}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

