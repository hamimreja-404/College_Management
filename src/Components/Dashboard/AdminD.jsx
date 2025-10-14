import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, LogOut, Loader, UserPlus, ToggleLeft, ToggleRight, X } from 'lucide-react';

// --- Reusable Input Field Component (No changes needed) ---
const InputField = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input
            id={id}
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 focus:border-teal-500"
            {...props}
        />
    </div>
);

// --- Main Admin Dashboard Component ---
export default function AdminDashboard1() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const adminData = useMemo(() => {
        const encodedData = searchParams.get("data");
        if (!encodedData) { navigate("/"); return null; }
        try {
            const decoded = JSON.parse(atob(decodeURIComponent(encodedData)));
            // --- THIS IS THE FIX ---
            // The login page sends 'college', so we read 'decoded.college'.
            // We then assign it to 'collegeName' for consistent use within this component.

            return { ...decoded, collegeName: decoded.college };
        } catch (err) {
            toast.error("Invalid session. Redirecting to login.");
            navigate("/");
            return null;
        }
    }, [searchParams, navigate]);

    useEffect(() => {
        if (!adminData) return;

        const fetchStudents = async () => {
            setIsFetching(true);
            try {
                const params = new URLSearchParams({
                    role: 'admin',
                    collegeName: adminData.collegeName 
                });
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?${params.toString()}`);
                setStudents(response.data.data);
            } catch (err) {
                setError("Failed to load student list.");
                toast.error(err.response?.data?.message || "Could not fetch student data.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchStudents();
    }, [adminData]);
    
    // --- Other functions (handleToggleStatus, handleAddStudent) are correct and need no changes ---

    const handleToggleStatus = async (studentId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        const toastId = toast.loading(`Setting status to ${newStatus}...`);
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/${studentId}/status`, { status: newStatus });
            setStudents(students.map(s => s._id === studentId ? { ...s, status: newStatus } : s));
            toast.success("Status updated successfully!", { id: toastId });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status.", { id: toastId });
        }
    };

    const handleAddStudent = async (studentData) => {
        const toastId = toast.loading("Creating new student account...");
        try {
            const payload = { ...studentData, collegeName: adminData.collegeName };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, payload);
            setStudents([...students, response.data.data]);
            toast.success("Student created successfully!", { id: toastId });
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create student.", { id: toastId });
        }
    };
    
    // --- Render Logic (no changes needed) ---
    if (isFetching) { return <div className="flex h-screen items-center justify-center"><Loader className="animate-spin text-teal-600" size={48} /></div>; }
    if (error) { return <div className="flex h-screen items-center justify-center text-center"><div><h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2><p className="text-gray-600 mt-2">{error}</p><Link to="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg">Go to Login</Link></div></div>; }

    return (
        <>
            <Toaster position="top-right" />
            {isModalOpen && <AddStudentModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddStudent} />}
            
            <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
                <aside className="w-64 bg-teal-800 text-white flex-col shrink-0 hidden md:flex">
                    <div className="p-6 text-2xl font-bold border-b border-teal-700">Admin Panel</div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-600 font-semibold"><User size={20} /> Manage Students</a>
                    </nav>
                    <div className="p-4 border-t border-teal-700">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"><LogOut size={20} /> Logout</Link>
                    </div>
                </aside>

                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <header className="flex justify-between items-center pb-6 border-b">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">Student Management</h1>
                            <p className="text-lg text-gray-500 mt-1">{adminData?.collegeName ?? 'College'}</p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                            <UserPlus size={18} />
                            <span>Add Student</span>
                        </button>
                    </header>
                    
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Student Roster ({students.length})</h2>
                        <StudentTable students={students} onToggleStatus={handleToggleStatus} />
                    </div>
                </main>
            </div>
        </>
    );
}

// --- UI Sub-components (StudentTable, AddStudentModal) ---
const StudentTable = ({ students, onToggleStatus }) => {
    if (students.length === 0) {
        return <p className="text-center text-gray-500 py-8">No students found for this college.</p>;
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username / Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course / Year</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.username}<br/>{student.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course || 'N/A'}<br/>Year: {student.year || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button onClick={() => onToggleStatus(student._id, student.status)} title={`Click to set to ${student.status === 'Active' ? 'Inactive' : 'Active'}`}>
                                    {student.status === 'Active' ? <ToggleRight size={24} className="text-green-500" /> : <ToggleLeft size={24} className="text-red-500" />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const AddStudentModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', course: '', year: '', roll: '', grade: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.username || !formData.password) {
            return toast.error("Name, Username, and Password are required.");
        }
        onSubmit(formData);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Create New Student</h2><button onClick={onClose}><X size={24} className="text-gray-500" /></button></div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Full Name" id="name" value={formData.name} onChange={handleChange} />
                        <InputField label="Username" id="username" value={formData.username} onChange={handleChange} />
                        <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
                        <InputField label="Password" id="password" type="password" value={formData.password} onChange={handleChange} />
                        <InputField label="Course" id="course" value={formData.course} onChange={handleChange} />
                        <InputField label="Year" id="year" value={formData.year} onChange={handleChange} />
                        <InputField label="Roll Number" id="roll" value={formData.roll} onChange={handleChange} />
                        <InputField label="Grade" id="grade" value={formData.grade} onChange={handleChange} />
                    </div>
                    <div className="pt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button><button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Create Student</button></div>
                </form>
            </div>
        </div>
    );
};

