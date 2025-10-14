// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { User, LogOut, Loader, Save, Shield, UserPlus, ToggleLeft, ToggleRight, X } from 'lucide-react';

// // --- Reusable Input Field Component ---
// const InputField = ({ label, id, ...props }) => (
//     <div>
//         <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//         <input
//             id={id}
//             className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                 props.readOnly 
//                 ? 'bg-gray-100 cursor-not-allowed border-gray-300' 
//                 : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
//             }`}
//             {...props}
//         />
//     </div>
// );


// // --- Main Super Admin Dashboard Component ---
// export default function SuperAdminDashboard1() {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     // --- STATE MANAGEMENT ---
//     const [users, setUsers] = useState([]); // Will hold both admins and students
//     const [isFetching, setIsFetching] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState('admins'); // 'admins' or 'students'
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Securely parse the logged-in Super Admin's data from the URL
//     const superAdminData = useMemo(() => {
//         const encodedData = searchParams.get("data");
//         if (!encodedData) { navigate("/"); return null; }
//         try {
//             return JSON.parse(atob(decodeURIComponent(encodedData)));
//         } catch (err) {
//             toast.error("Invalid session. Redirecting to login.");
//             navigate("/");
//             return null;
//         }
//     }, [searchParams, navigate]);

//     // --- DATA FETCHING ---
//     useEffect(() => {
//         if (!superAdminData) return;

//         const fetchUsers = async () => {
//             setIsFetching(true);
//             try {
//                 // Use the new /users endpoint to get all admins and students
//                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?role=super_admin`);
//                 setUsers(response.data.data);
//             } catch (err) {
//                 const errorMessage = err.response?.data?.message || "Could not fetch user data.";
//                 setError("Failed to load user list.");
//                 toast.error(errorMessage);
//             } finally {
//                 setIsFetching(false);
//             }
//         };

//         fetchUsers();
//     }, [superAdminData]);

//     // --- API HANDLERS ---
//     const handleToggleStatus = async (userId, currentStatus) => {
//         const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
//         const toastId = toast.loading(`Updating status to ${newStatus}...`);
//         try {
//             await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}/status`, { status: newStatus });
//             // Update the state locally for an instant UI change
//             setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
//             toast.success("Status updated successfully!", { id: toastId });
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || "Failed to update status.";
//             toast.error(errorMessage, { id: toastId });
//         }
//     };

//     const handleCreateAdmin = async (adminData) => {
//         const toastId = toast.loading("Creating new admin...");
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/admins`, adminData);
//             // Add the new admin to our local state
//             setUsers([...users, response.data.data]);
//             toast.success("Admin created successfully!", { id: toastId });
//             setIsModalOpen(false); // Close the modal on success
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || "Failed to create admin.";
//             toast.error(errorMessage, { id: toastId });
//         }
//     };
    
//     // --- RENDER LOGIC ---
//     if (isFetching) {
//         return <div className="flex h-screen items-center justify-center"><Loader className="animate-spin text-teal-600" size={48} /></div>;
//     }
//     if (error) {
//         return <div className="flex h-screen items-center justify-center text-center"><div><h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2><p className="text-gray-600 mt-2">{error}</p><Link to="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg">Go to Login</Link></div></div>;
//     }

//     const adminUsers = users.filter(u => u.role === 'admin');
//     const studentUsers = users.filter(u => u.role === 'student');

//     return (
//         <>
//             <Toaster position="top-right" />
//             {isModalOpen && <CreateAdminModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreateAdmin} />}
            
//             <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
//                 <aside className="w-64 bg-gray-800 text-white flex-col shrink-0 hidden md:flex">
//                     <div className="p-6 text-2xl font-bold border-b border-gray-700">Super Admin</div>
//                     <nav className="flex-1 p-4 space-y-2">
//                         <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-600 font-semibold"><Shield size={20} /> Manage Users</a>
//                     </nav>
//                     <div className="p-4 border-t border-gray-700">
//                         <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"><LogOut size={20} /> Logout</Link>
//                     </div>
//                 </aside>

//                 <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
//                     <header className="flex justify-between items-center pb-6 border-b">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-700">User Management</h1>
//                             <p className="text-lg text-gray-500 mt-1">Welcome, {superAdminData?.name ?? 'Super Admin'}</p>
//                         </div>
//                         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
//                             <UserPlus size={18} />
//                             <span>Create Admin</span>
//                         </button>
//                     </header>
                    
//                     <div className="mt-8">
//                         {/* --- TABS --- */}
//                         <div className="flex border-b">
//                             <TabButton title={`Admins (${adminUsers.length})`} isActive={activeTab === 'admins'} onClick={() => setActiveTab('admins')} />
//                             <TabButton title={`Students (${studentUsers.length})`} isActive={activeTab === 'students'} onClick={() => setActiveTab('students')} />
//                         </div>

//                         {/* --- USER TABLES --- */}
//                         <div className="bg-white rounded-lg shadow-md p-6 mt-4">
//                             {activeTab === 'admins' && <UserTable users={adminUsers} onToggleStatus={handleToggleStatus} />}
//                             {activeTab === 'students' && <UserTable users={studentUsers} onToggleStatus={handleToggleStatus} />}
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// }


// // --- UI Sub-components ---

// const TabButton = ({ title, isActive, onClick }) => (
//     <button onClick={onClick} className={`py-2 px-4 text-sm font-medium transition-colors ${isActive ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
//         {title}
//     </button>
// );

// const UserTable = ({ users, onToggleStatus }) => {
//     if (users.length === 0) {
//         return <p className="text-center text-gray-500 py-8">No users found.</p>;
//     }
//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username / Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
//                         <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {users.map((user) => (
//                         <tr key={user._id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}<br/>{user.email}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.collegeName || 'N/A'}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-center">
//                                 <button onClick={() => onToggleStatus(user._id, user.status)} title={`Click to set to ${user.status === 'Active' ? 'Inactive' : 'Active'}`}>
//                                     {user.status === 'Active' ? (
//                                         <ToggleRight size={24} className="text-green-500" />
//                                     ) : (
//                                         <ToggleLeft size={24} className="text-red-500" />
//                                     )}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// const CreateAdminModal = ({ onClose, onSubmit }) => {
//     const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', collegeName: '' });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Basic validation
//         for (const key in formData) {
//             if (!formData[key]) {
//                 return toast.error(`${key.replace(/([A-Z])/g, ' $1')} is required.`);
//             }
//         }
//         onSubmit(formData);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//                 <div className="p-6 border-b flex justify-between items-center">
//                     <h2 className="text-xl font-bold">Create New Admin</h2>
//                     <button onClick={onClose}><X size={24} className="text-gray-500" /></button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                     <InputField label="Full Name" id="name" value={formData.name} onChange={handleChange} />
//                     <InputField label="Username" id="username" value={formData.username} onChange={handleChange} />
//                     <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
//                     <InputField label="Password" id="password" type="password" value={formData.password} onChange={handleChange} />
//                     <InputField label="College Name" id="collegeName" value={formData.collegeName} onChange={handleChange} />
//                     <div className="pt-4 flex justify-end gap-3">
//                         <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
//                         <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Create Admin</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };


//++++++++++++++++++NEW+++++++++++++++++

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, LogOut, Loader, Save, Shield, UserPlus, ToggleLeft, ToggleRight, X, Edit } from 'lucide-react';

// --- Reusable Input Field Component ---
const InputField = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input
            id={id}
            className={`block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                props.readOnly 
                ? 'bg-gray-100 cursor-not-allowed border-gray-300' 
                : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
            }`}
            {...props}
        />
    </div>
);


// --- Main Super Admin Dashboard Component ---
export default function SuperAdminDashboard1() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('admins');
    
    // --- NEW: State for modals ---
    const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Securely parse the logged-in Super Admin's data from the URL
    // We use useState to make it updatable after a profile change
    const [superAdminData, setSuperAdminData] = useState(() => {
        const encodedData = searchParams.get("data");
        if (!encodedData) { navigate("/"); return null; }
        try {
            return JSON.parse(atob(decodeURIComponent(encodedData)));
        } catch (err) {
            toast.error("Invalid session. Redirecting to login.");
            navigate("/");
            return null;
        }
    });

    // --- DATA FETCHING ---
    useEffect(() => {
        if (!superAdminData) return;
        const fetchUsers = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?role=super_admin`);
                setUsers(response.data.data);
            } catch (err) {
                setError("Failed to load user list.");
                toast.error(err.response?.data?.message || "Could not fetch user data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchUsers();
    }, [superAdminData]);

    // --- API HANDLERS ---
    const handleToggleStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        const toastId = toast.loading(`Updating status...`);
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}/status`, { status: newStatus });
            setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
            toast.success("Status updated successfully!", { id: toastId });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status.", { id: toastId });
        }
    };

    const handleCreateAdmin = async (adminData) => {
        const toastId = toast.loading("Creating new admin...");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/admins`, adminData);
            setUsers([...users, response.data.data]);
            toast.success("Admin created successfully!", { id: toastId });
            setIsCreateAdminModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create admin.", { id: toastId });
        }
    };

    // --- NEW: Handler for updating the Super Admin's own profile ---
    const handleProfileUpdate = async (profileData) => {
        const toastId = toast.loading("Updating your profile...");
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${superAdminData.id}/profile`, profileData);
            // Update the name in the header
            setSuperAdminData(prev => ({...prev, name: response.data.data.name }));
            toast.success("Profile updated successfully!", { id: toastId });
            setIsProfileModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile.", { id: toastId });
        }
    };
    
    // --- RENDER LOGIC ---
    if (isFetching) {
        return <div className="flex h-screen items-center justify-center"><Loader className="animate-spin text-teal-600" size={48} /></div>;
    }
    if (error) {
        return <div className="flex h-screen items-center justify-center text-center"><div><h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2><p className="text-gray-600 mt-2">{error}</p><Link to="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg">Go to Login</Link></div></div>;
    }

    const adminUsers = users.filter(u => u.role === 'admin');
    const studentUsers = users.filter(u => u.role === 'student');

    return (
        <>
            <Toaster position="top-right" />
            {isCreateAdminModalOpen && <CreateAdminModal onClose={() => setIsCreateAdminModalOpen(false)} onSubmit={handleCreateAdmin} />}
            {isProfileModalOpen && <EditProfileModal onClose={() => setIsProfileModalOpen(false)} onSubmit={handleProfileUpdate} initialData={superAdminData} />}
            
            <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
                <aside className="w-64 bg-gray-800 text-white flex-col shrink-0 hidden md:flex">
                    <div className="p-6 text-2xl font-bold border-b border-gray-700">Super Admin</div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-600 font-semibold"><Shield size={20} /> Manage Users</a>
                    </nav>
                    <div className="p-4 border-t border-gray-700">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"><LogOut size={20} /> Logout</Link>
                    </div>
                </aside>

                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <header className="flex justify-between items-center pb-6 border-b">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">User Management</h1>
                            <p className="text-lg text-gray-500 mt-1">Welcome, {superAdminData?.name ?? 'Super Admin'}</p>
                        </div>
                        {/* --- MODIFIED: Header buttons --- */}
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                                <Edit size={18} /><span>My Profile</span>
                            </button>
                            <button onClick={() => setIsCreateAdminModalOpen(true)} className="flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                                <UserPlus size={18} /><span>Create Admin</span>
                            </button>
                        </div>
                    </header>
                    
                    <div className="mt-8">
                        <div className="flex border-b">
                            <TabButton title={`Admins (${adminUsers.length})`} isActive={activeTab === 'admins'} onClick={() => setActiveTab('admins')} />
                            <TabButton title={`Students (${studentUsers.length})`} isActive={activeTab === 'students'} onClick={() => setActiveTab('students')} />
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                            {activeTab === 'admins' && <UserTable users={adminUsers} onToggleStatus={handleToggleStatus} />}
                            {activeTab === 'students' && <UserTable users={studentUsers} onToggleStatus={handleToggleStatus} />}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

// --- UI Sub-components (TabButton, UserTable, CreateAdminModal are the same as before) ---

const TabButton = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`py-2 px-4 text-sm font-medium transition-colors ${isActive ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
        {title}
    </button>
);

const UserTable = ({ users, onToggleStatus }) => {
    if (users.length === 0) return <p className="text-center text-gray-500 py-8">No users found.</p>;
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username / Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">{users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}<br/>{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.collegeName || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button onClick={() => onToggleStatus(user._id, user.status)} title={`Click to set to ${user.status === 'Active' ? 'Inactive' : 'Active'}`}>
                                {user.status === 'Active' ? <ToggleRight size={24} className="text-green-500" /> : <ToggleLeft size={24} className="text-red-500" />}
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};

const CreateAdminModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', collegeName: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in formData) { if (!formData[key]) return toast.error(`${key} is required.`); }
        onSubmit(formData);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Create New Admin</h2><button onClick={onClose}><X size={24} className="text-gray-500" /></button></div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Full Name" id="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Username" id="username" value={formData.username} onChange={handleChange} />
                    <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
                    <InputField label="Password" id="password" type="password" value={formData.password} onChange={handleChange} />
                    <InputField label="College Name" id="collegeName" value={formData.collegeName} onChange={handleChange} />
                    <div className="pt-4 flex justify-end gap-3"><button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button><button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Create Admin</button></div>
                </form>
            </div>
        </div>
    );
};

// --- NEW: Modal component for editing the Super Admin's profile ---
const EditProfileModal = ({ onClose, onSubmit, initialData }) => {
    const [name, setName] = useState(initialData.name);
    const [email, setEmail] = useState(initialData.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }
        if (password && password.length < 6) {
            return toast.error("Password must be at least 6 characters.");
        }
        const payload = { name, email };
        if (password) {
            payload.password = password;
        }
        onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Edit Your Profile</h2><button onClick={onClose}><X size={24} className="text-gray-500" /></button></div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <InputField label="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="New Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" />
                    <InputField label="Confirm New Password" id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className="pt-4 flex justify-end gap-3"><button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button><button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Save Changes</button></div>
                </form>
            </div>
        </div>
    );
};

