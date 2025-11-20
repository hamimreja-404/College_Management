import React, { useState, useEffect, useRef } from 'react';

// --- Reusable UI Components ---

// Modal Component (Handles outside clicks and escape key)
const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-md' }) => {
    const modalRef = useRef();
    useEffect(() => {
        const handleEscape = (event) => event.key === 'Escape' && onClose();
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
            <div ref={modalRef} className={`bg-white rounded-lg shadow-xl w-full ${maxWidth}`}>
                {children}
            </div>
        </div>
    );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );

    return (
        <div className="fixed top-5 right-5 z-[100]">
            <div className={`flex items-center text-white p-4 rounded-lg shadow-lg ${bgColor} animate-slide-in-right`}>
                {icon}
                <span className="ml-3 font-medium">{message}</span>
            </div>
        </div>
    );
};

// Loading Spinner Component
const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- Main Dashboard Component ---

export default function SuperAdminDashboard() {
    const [activeView, setActiveView] = useState('students');
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    
    // Data is now in state to allow for updates
    const [admins, setAdmins] = useState([
        { id: 1, name: 'John Doe', username: 'johndoe_admin', collegeName: 'Aliah University', email: 'john.doe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', username: 'janesmith_admin', collegeName: 'Amity University', email: 'jane.smith@example.com', status: 'Inactive' },
    ]);
    const [students, setStudents] = useState([
         { id: 1, name: 'Alamin Sardar', university: 'Aliah University', roll: 'AU-23-401', year: '3rd', course: 'B.Sc Nursing', grade: 'A+', status: 'Active' },
         { id: 2, name: 'Hamim Reja', university: 'Aliah University', roll: 'AU-23-402', year: '3rd', course: 'B.Sc Nursing', grade: 'O', status: 'Inactive' },
         { id: 3, name: 'Syed Tarik', university: 'Amity University', roll: 'AM-22-156', year: '4th', course: 'GNM', grade: 'A+', status: 'Active' },
    ]);

    // Function to show toast notifications
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    // --- Form Handlers with Loading & Toast Simulation ---

    const handleAddAdmin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            const formData = new FormData(e.target);
            const newAdmin = {
                id: Date.now(),
                name: formData.get('admin-fullname'),
                username: formData.get('admin-username'),
                collegeName: formData.get('admin-college'),
                email: formData.get('admin-username') + '@example.com', // simplified for demo
                status: 'Active'
            };
            setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
            setIsLoading(false);
            setShowAddAdminModal(false);
            showToast('Admin created successfully!', 'success');
        }, 1500); // Simulate network delay
    };
    
    const handleAddStudent = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            const formData = new FormData(e.target);
            const newStudent = {
                id: Date.now(),
                name: formData.get('student-fullname'),
                university: 'Globe Allied University', // Added for demo
                roll: formData.get('student-roll'),
                year: formData.get('student-year'),
                course: formData.get('student-course'),
                grade: 'N/A',
                status: 'Active'
            };
            setStudents(prev => [...prev, newStudent]);
            setIsLoading(false);
            setShowAddStudentModal(false);
            showToast('Student added successfully!', 'success');
        }, 1500);
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
             setIsLoading(false);
             showToast('Profile updated successfully!', 'success');
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
                        {['admins', 'students', 'profile'].map(view => (
                             <a key={view} href="#" onClick={(e) => {e.preventDefault(); setActiveView(view)}} 
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === view ? 'bg-teal-600 font-semibold' : 'hover:bg-teal-700'}`}>
                                {view.charAt(0).toUpperCase() + view.slice(1)}
                            </a>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-teal-700">
                        <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Logout
                        </a>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <header className="flex justify-between items-center pb-6 border-b">
                        <h1 className="text-3xl font-bold text-gray-700">{activeView.charAt(0).toUpperCase() + activeView.slice(1)} Management</h1>
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">Welcome, Super Admin!</span>
                            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">SA</div>
                        </div>
                    </header>

                    {/* Views */}
                    {activeView === 'admins' && (
                        <div className="mt-8">
                            <div className="flex justify-end mb-4">
                                <button onClick={() => setShowAddAdminModal(true)} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                                    + Create New Admin
                                </button>
                            </div>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full whitespace-nowrap">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-4 text-left font-semibold">Full Name</th>
                                                <th className="p-4 text-left font-semibold">Username</th>
                                                <th className="p-4 text-left font-semibold">College Name</th>
                                                <th className="p-4 text-left font-semibold">Status</th>
                                                <th className="p-4 text-left font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins.map(admin => (
                                                <tr key={admin.id} className="border-b">
                                                    <td className="p-4">{admin.name}</td>
                                                    <td className="p-4 font-mono text-sm">{admin.username}</td>
                                                    <td className="p-4">{admin.collegeName}</td>
                                                    <td className="p-4"><span className={`px-3 py-1 text-sm rounded-full ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{admin.status}</span></td>
                                                    <td className="p-4">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" defaultChecked={admin.status === 'Active'} className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeView === 'students' && (
                         <div className="mt-8">
                            <div className="flex justify-end mb-4"><button onClick={() => setShowAddStudentModal(true)} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">+ Add New Student</button></div>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden"><div className="overflow-x-auto"><table className="w-full whitespace-nowrap">
                                <thead className="bg-gray-100"><tr><th className="p-4 text-left font-semibold">Name</th><th className="p-4 text-left font-semibold">University</th><th className="p-4 text-left font-semibold">Roll No.</th><th className="p-4 text-left font-semibold">Year</th><th className="p-4 text-left font-semibold">Course</th><th className="p-4 text-left font-semibold">Grade</th><th className="p-4 text-left font-semibold">Status</th><th className="p-4 text-left font-semibold">Actions</th></tr></thead>
                                <tbody>
                                    {students.map(student => (
                                        <tr key={student.id} className="border-b">
                                            <td className="p-4">{student.name}</td><td className="p-4">{student.university}</td><td className="p-4">{student.roll}</td><td className="p-4">{student.year}</td><td className="p-4">{student.course}</td><td className="p-4 font-semibold text-gray-700">{student.grade}</td>
                                            <td className="p-4"><span className={`px-3 py-1 text-sm rounded-full ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{student.status}</span></td>
                                            <td className="p-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked={student.status === 'Active'} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div></div>
                        </div>
                    )}

                    {activeView === 'profile' && (
                        <div className="mt-8"><div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                           <h2 className="text-2xl font-bold mb-6">Edit My Profile</h2>
                            <form className="space-y-6" onSubmit={handleProfileSave}>
                                <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" id="name" defaultValue="Super Admin" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label><input type="email" id="email" defaultValue="superadmin@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" /></div>
                                <div><label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label><input type="password" id="password" placeholder="Leave blank to keep current password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" /></div>
                                <div className="flex justify-end">
                                    <button type="submit" disabled={isLoading} className="w-36 flex justify-center bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-teal-400">
                                        {isLoading ? <Spinner /> : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div></div>
                    )}
                </main>
            </div>

            {/* Modals with Forms and Loading State */}
            <Modal isOpen={showAddAdminModal} onClose={() => setShowAddAdminModal(false)}>
                <div className="p-8"><h2 className="text-2xl font-bold mb-6">Create New Admin Account</h2>
                    <form className="space-y-4" onSubmit={handleAddAdmin}>
                        <div><label htmlFor="admin-fullname">Full Name</label><input type="text" name="admin-fullname" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. John Doe" /></div>
                        <div><label htmlFor="admin-username">Username</label><input type="text" name="admin-username" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. johndoe_admin" /></div>
                        <div><label htmlFor="admin-college">College Name</label><input type="text" name="admin-college" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. Aliah University" /></div>
                        <div><label htmlFor="admin-password">Password</label><input type="password" name="admin-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="••••••••" /></div>
                        <div className="flex justify-end pt-4 space-x-3">
                            <button type="button" onClick={() => setShowAddAdminModal(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                            <button type="submit" disabled={isLoading} className="w-36 flex justify-center bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-teal-400">
                                {isLoading ? <Spinner/> : 'Create Admin'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            
            <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} maxWidth="max-w-lg">
                <div className="p-8"><h2 className="text-2xl font-bold mb-6">Add New Student</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddStudent}>
                        <div><label>Full Name</label><input type="text" name="student-fullname" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. Jane Doe" /></div>
                        <div><label>Username</label><input type="text" name="student-username" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. janedoe23" /></div>
                        <div><label>Roll Number</label><input type="text" name="student-roll" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. AU-23-405" /></div>
                        <div><label>Year</label><input type="text" name="student-year" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 3rd" /></div>
                        <div className="md:col-span-2"><label>Course</label><input type="text" name="student-course" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. B.Sc Nursing" /></div>
                        <div className="md:col-span-2"><label>Password</label><input type="password" name="student-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="••••••••" /></div>
                        <div className="md:col-span-2 flex justify-end pt-4 space-x-3">
                            <button type="button" onClick={() => setShowAddStudentModal(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                            <button type="submit" disabled={isLoading} className="w-36 flex justify-center bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-teal-400">
                                {isLoading ? <Spinner/> : 'Add Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

