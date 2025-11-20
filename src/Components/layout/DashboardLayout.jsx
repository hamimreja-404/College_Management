import React from 'react';
import Sidebar from './Sidebar';

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

export default DashboardLayout;
