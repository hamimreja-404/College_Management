import React, { useState } from 'react';
import ActionButton from 'components/ui/ActionButton.jsx';
import Toast from 'components/ui/Toast.jsx';

const RoleButton = ({ role, icon, selectedRole, setSelectedRole }) => {
    const isSelected = selectedRole === role;
    return (
        <button
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition-all duration-300 text-sm font-semibold ${
                isSelected ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            {icon}
            <span>{role}</span>
        </button>
    );
};

const StudentIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L9 9.61v5.063l-4.61-2.206a1 1 0 00-1.033 1.746l5.5 2.62a1 1 0 001.086 0l5.5-2.62a1 1 0 00-1.033-1.746L11 14.673V9.61l6.606-2.69a1 1 0 000-1.84l-7-3zM10 8a1 1 0 100-2 1 1 0 000 2z" /></svg>;
const AdminIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>;
const SuperAdminIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L7.85 5.89a1.5 1.5 0 01-1.42 1.05l-2.7-.45c-1.52-.25-2.74 1.22-2.14 2.64l1.2 2.41a1.5 1.5 0 01-.26 1.63l-1.8 2.15c-1.13 1.35-.3 3.41 1.42 3.41h2.85a1.5 1.5 0 011.42 1.05l.64 2.72c.25 1.52 2.37 1.52 2.62 0l.64-2.72a1.5 1.5 0 011.42-1.05h2.85c1.72 0 2.55-2.06 1.42-3.41l-1.8-2.15a1.5 1.5 0 01-.26-1.63l1.2-2.41c.6-1.42-.62-2.89-2.14-2.64l-2.7.45a1.5 1.5 0 01-1.42-1.05l-.64-2.72zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            showToast('Invalid username or password', 'error');
        }, 1500);
    };

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
    };

    return (
        <>
            {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
            <div className="flex items-center justify-center min-h-screen bg-[#e0f2f1] font-sans">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                        <p className="mt-2 text-sm text-gray-500">Log in to your dashboard</p>
                    </div>

                    <div className="flex items-center justify-center space-x-2 p-1.5 bg-gray-100 rounded-xl">
                        <RoleButton role="Student" icon={StudentIcon} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                        <RoleButton role="Admin" icon={AdminIcon} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                        <RoleButton role="Super Admin" icon={SuperAdminIcon} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Form inputs */}
                        <div className="relative">
                           <input type="text" name="username" placeholder="Username" required className="w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="relative">
                           <input type="password" name="password" placeholder="Password" required className="w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <ActionButton
                            type="submit"
                            isLoading={isLoading}
                            fullWidth={true}
                        >
                            Login
                        </ActionButton>
                    </form>
                </div>
            </div>
        </>
    );
}
