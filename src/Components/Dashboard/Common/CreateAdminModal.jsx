import React, { useState } from "react";
import InputField from "./InputField";
import {
  X
} from "lucide-react";
const CreateAdminModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    collegeName: "",
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) return toast.error(`${key} is required.`);
    }
    onSubmit(formData);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Admin</h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputField
            label="Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            label="College Name"
            id="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
          />
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CreateAdminModal;