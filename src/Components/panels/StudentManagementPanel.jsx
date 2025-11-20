import React, { useState } from 'react';
// import Modal from '../ui/Modal.jsx';
import ActionButton from '../ui/ActionButton.jsx';

// This component is reusable for both Super Admin and Admin
const StudentManagementPanel = ({ canAddOrEdit = false }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data
    const [students, setStudents] = useState([
        { id: 1, name: 'Alamin Sardar', college: 'Aliah University', roll: 'AU-23-401', grade: 'A+', status: 'Active' },
        { id: 2, name: 'Hamim Reja', college: 'Aliah University', roll: 'AU-23-402', grade: 'O', status: 'Inactive' },
        { id: 3, name: 'XYZ', college: 'Amity University', roll: 'AM-22-105', grade: 'C+', status: 'Active' },
    ]);
    
    const handleAddStudent = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowAddModal(false);
        }, 1500);
    };

    return (
        <>
            {canAddOrEdit && (
                <div className="flex justify-end mb-4">
                    <button onClick={() => setShowAddModal(true)} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        + Add New Student
                    </button>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        {/* Table Head */}
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left font-semibold">Name</th>
                                <th className="p-4 text-left font-semibold">College</th>
                                <th className="p-4 text-left font-semibold">Roll No.</th>
                                <th className="p-4 text-left font-semibold">Grade</th>
                                <th className="p-4 text-left font-semibold">Status</th>
                                <th className="p-4 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {students.map(student => (
                               <tr key={student.id} className="border-b">
                                    <td className="p-4">{student.name}</td>
                                    <td className="p-4">{student.college}</td>
                                    <td className="p-4">{student.roll}</td>
                                    <td className="p-4">{student.grade}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-sm rounded-full ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{student.status}</span>
                                    </td>
                                    <td className="p-4">
                                         <div className="flex items-center space-x-3">
                                            {canAddOrEdit && (
                                                <button className="text-teal-600 hover:text-teal-800" title="Edit Student">
                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                </button>
                                            )}
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked={student.status === 'Active'} className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Add Student Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="max-w-lg">
                <div className="p-8">
                     <h2 className="text-2xl font-bold mb-6">Add New Student</h2>
                    <form className="space-y-4" onSubmit={handleAddStudent}>
                        {/* Form fields for adding a student */}
                        <div className="flex justify-end pt-4 space-x-3">
                            <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                            <ActionButton type="submit" isLoading={isLoading}>Add Student</ActionButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default StudentManagementPanel;
