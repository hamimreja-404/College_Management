import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, LogOut, Loader, Save } from 'lucide-react';
import InputField from './Common/InputField.jsx';

// --- Main Student Dashboard Component ---
export default function StudentDashboard() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [passwordFields, setPasswordFields] = useState({ password: '', confirmPassword: '' });
    const [isFetching, setIsFetching] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const userData = useMemo(() => {
        const encodedData = searchParams.get("data");
        if (!encodedData) { navigate("/"); return null; }
        try {
            return JSON.parse(atob(decodeURIComponent(encodedData)));
        } catch (err) {
            toast.error("Invalid session. Redirecting to login.");
            navigate("/");
            return null;
        }
    }, [searchParams, navigate]);

    useEffect(() => {
        if (!userData?.id) return;
        const fetchStudentProfile = async () => {
            setIsFetching(true);
            setError(null);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userData.id}`);
                setStudentData(response.data.data);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Could not fetch profile.";
                setError("Failed to load your profile data. Please try logging in again.");
                toast.error(errorMessage);
            } finally {
                setIsFetching(false);
            }
        };
        fetchStudentProfile();
    }, [userData?.id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setStudentData({ ...studentData, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordFields({ ...passwordFields, [id]: value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (passwordFields.password && passwordFields.password !== passwordFields.confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        if (passwordFields.password && passwordFields.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setIsUpdating(true);
        const toastId = toast.loading("Updating profile...");
        const payload = {
            name: studentData.name,
            email: studentData.email,
        };
        if (passwordFields.password) {
            payload.password = passwordFields.password;
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${userData.id}/profile`, payload);
            toast.success('Profile updated successfully!', { id: toastId });
            setPasswordFields({ password: '', confirmPassword: '' });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update profile.";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsUpdating(false);
        }
    };

    if (isFetching) {
        return <div className="flex h-screen items-center justify-center bg-gray-50"><Loader className="animate-spin text-teal-600" size={48} /></div>;
    }

    if (error || !studentData) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <Link to="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
                <aside className="w-64 bg-teal-800 text-white flex-col shrink-0 hidden md:flex">
                    <div className="p-6 text-2xl font-bold border-b border-teal-700">Student Panel</div>
                    <nav className="flex-1 p-4 space-y-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-600 font-semibold">
                           <User size={20} /> My Profile
                        </a>
                    </nav>
                    <div className="p-4 border-t border-teal-700">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                            <LogOut size={20} /> Logout
                        </Link>
                    </div>
                </aside>
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <header className="flex justify-between items-center pb-6 border-b">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700">My Profile</h1>
                            <p className="text-lg text-gray-500 mt-1">{studentData.collegeName ?? 'N/A'}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold text-right hidden sm:block">Welcome, {studentData.name ?? 'Student'}!<br/><span className="text-sm text-gray-500 font-normal">Student</span></span>
                            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                {studentData.name?.charAt(0) ?? '?'}
                            </div>
                        </div>
                    </header>
                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-gray-700">Profile Information</h2>
                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <InputField label="Full Name" id="name" value={studentData.name ?? ''} onChange={handleInputChange} />
                                        <InputField label="Username" id="username" value={studentData.username ?? ''} readOnly />
                                        <InputField label="Email Address" id="email" type="email" value={studentData.email ?? ''} onChange={handleInputChange} />
                                        <InputField label="Roll Number" id="roll" value={studentData.roll ?? ''} readOnly />
                                    </div>
                                    <div className="space-y-6">
                                        <InputField label="Course" id="course" value={studentData.course ?? ''} readOnly />
                                        <InputField label="Year" id="year" value={studentData.year ?? ''} readOnly />
                                        <InputField label="Change Password" id="password" type="password" value={passwordFields.password} onChange={handlePasswordChange} placeholder="Leave blank to keep current" />
                                        <InputField label="Confirm New Password" id="confirmPassword" type="password" value={passwordFields.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm your new password" />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" disabled={isUpdating} className="w-40 flex justify-center items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-teal-400 transition-colors">
                                        {isUpdating ? <><Loader className="animate-spin" size={20} /> Saving...</> : <><Save size={20} /> Save Changes</>}
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

