import React, { useState } from 'react';
// import Modal from '../ui/Modal.jsx';
import ActionButton from '../ui/ActionButton.jsx';

const AdminManagementPanel = () => {
    const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data
    const [admins, setAdmins] = useState([
        { id: 1, name: 'John Doe', username: 'johndoe', college: 'Aliah University', status: 'Active' },
        { id: 2, name: 'Jane Smith', username: 'janesmith', college: 'Amity University', status: 'Inactive' },
    ]);
    
    const handleCreateAdmin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            // Logic to add admin
            setIsLoading(false);
            setShowCreateAdminModal(false);
            // Show toast notification
        }, 1500);
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <button onClick={() => setShowCreateAdminModal(true)} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                    + Create New Admin
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        {/* Table Head */}
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left font-semibold">Full Name</th>
                                <th className="p-4 text-left font-semibold">Username</th>
                                <th className="p-4 text-left font-semibold">College Name</th>
                                <th className="p-4 text-left font-semibold">Status</th>
                                <th className="p-4 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id} className="border-b">
                                    <td className="p-4">{admin.name}</td>
                                    <td className="p-4">{admin.username}</td>
                                    <td className="p-4">{admin.college}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-sm rounded-full ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{admin.status}</span>
                                    </td>
                                    <td className="p-4">
                                         <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={admin.status === 'Active'} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Create Admin Modal */}
            <Modal isOpen={showCreateAdminModal} onClose={() => setShowCreateAdminModal(false)}>
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Create New Admin</h2>
                    <form className="space-y-4" onSubmit={handleCreateAdmin}>
                         <div><label>Full Name</label><input type="text" name="admin-fullname" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                         <div><label>Username</label><input type="text" name="admin-username" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                         <div><label>College Name</label><input type="text" name="admin-college" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                         <div><label>Password</label><input type="password" name="admin-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/></div>
                        <div className="flex justify-end pt-4 space-x-3">
                            <button type="button" onClick={() => setShowCreateAdminModal(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                            <ActionButton type="submit" isLoading={isLoading}>Create Admin</ActionButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AdminManagementPanel;
