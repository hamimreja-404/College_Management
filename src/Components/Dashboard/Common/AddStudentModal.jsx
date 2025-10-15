import { useState } from "react";
import InputField from "./InputField";
import {
  X,
} from "lucide-react";
const AddStudentModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    course: "",
    year: "",
    roll: "",
    grade: "",
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Student</h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              label="Course"
              id="course"
              value={formData.course}
              onChange={handleChange}
            />
            <InputField
              label="Year"
              id="year"
              value={formData.year}
              onChange={handleChange}
            />
            <InputField
              label="Roll Number"
              id="roll"
              value={formData.roll}
              onChange={handleChange}
            />
            <InputField
              label="Grade"
              id="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </div>
          <div className="pt-6 flex justify-end gap-3">
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
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;