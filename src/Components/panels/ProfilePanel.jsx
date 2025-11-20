import React, { useState } from 'react';
import ActionButton from '../ui/ActionButton.jsx';

// This component can be used by any role (Super Admin, Admin, Student)
const ProfilePanel = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleProfileSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you would show a toast notification here
            console.log('Profile saved!');
        }, 1500);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit My Profile</h2>
            <form className="space-y-6" onSubmit={handleProfileSave}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input type="text" id="name" defaultValue={user?.name || ''} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                    <input type="email" id="email" defaultValue={user?.email || ''} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">New Password</label>
                    <input type="password" id="password" placeholder="Leave blank to keep current password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex justify-end">
                    <ActionButton type="submit" isLoading={isLoading}>
                        Save Changes
                    </ActionButton>
                </div>
            </form>
        </div>
    );
};

export default ProfilePanel;
