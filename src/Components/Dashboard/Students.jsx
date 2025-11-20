import React, { useState, useEffect, useRef } from 'react';

// --- Reusable UI Components (Toast, Spinner) ---

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
    ) : null;

    return (
        <div className="fixed top-5 right-5 z-[100]">
            <div className={`flex items-center text-white p-4 rounded-lg shadow-lg ${bgColor} animate-slide-in-right`}>
                {icon}
                <span className="ml-3 font-medium">{message}</span>
            </div>
        </div>
    );
};

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// --- Main Student Dashboard Component ---

export default function StudentDashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // Mock data for the logged-in student
    const studentData = {
        name: 'Alamin Sardar',
        username: 'alaminsardar',
        email: 'alamin.sardar@example.com',
        collegeName: 'Aliah University',
        roll: 'AU-23-401',
        year: '3rd',
        course: 'B.Sc Nursing',
        grade: 'A+',
        status: 'Active',
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate an API call to update the profile
        setTimeout(() => {
            setIsLoading(false);
            showToast('Profile updated successfully!', 'success');
            // In a real app, you would likely re-fetch the student data here
        }, 1500);
    };

    return (
        <>
            {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
            <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
                {/* Sidebar */}
                <aside className="w-64 bg-teal-800 text-white flex flex-col shrink-0">
                    <div className="p-6 text-2xl font-bold border-b border-teal-700">Globe Allied</div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" onClick={(e) => e.preventDefault()} 
                           className="flex items-center px-4 py-3 rounded-lg bg-teal-600 font-semibold">
                           My Profile
                        </a>
                    </nav>
                    <div className="p-4 border-t border-teal-700">
                        <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-teal-700">Logout</a>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <header className="flex justify-between items-center pb-6 border-b">
                        <div>
                             <h1 className="text-3xl font-bold text-gray-700">My Profile</h1>
                             <p className="text-lg text-gray-500 mt-1">{studentData.collegeName}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold text-right">Welcome, {studentData.name}!<br/><span className="text-sm text-gray-500 font-normal">Student</span></span>
                            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">
                                {studentData.name.charAt(0)}
                            </div>
                        </div>
                    </header>
                    
                    {/* Profile View */}
                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
                           <h2 className="text-2xl font-bold mb-6 text-gray-700">Profile Information</h2>
                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                                            <input type="text" id="name" defaultValue={studentData.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                                            <input type="text" id="username" defaultValue={studentData.username} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                                            <input type="email" id="email" defaultValue={studentData.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500" />
                                        </div>
                                         <div>
                                            <label htmlFor="roll" className="block text-sm font-medium text-gray-600">Roll Number</label>
                                            <input type="text" id="roll" defaultValue={studentData.roll} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="course" className="block text-sm font-medium text-gray-600">Course</label>
                                            <input type="text" id="course" defaultValue={studentData.course} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                                        </div>
                                         <div>
                                            <label htmlFor="year" className="block text-sm font-medium text-gray-600">Year</label>
                                            <input type="text" id="year" defaultValue={studentData.year} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Change Password</label>
                                            <input type="password" id="password" placeholder="Leave blank to keep current password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                                            <input type="password" id="confirm-password" placeholder="Confirm your new password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="submit" disabled={isLoading} className="w-40 flex justify-center bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-teal-400 transition-colors">
                                        {isLoading ? <Spinner /> : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
