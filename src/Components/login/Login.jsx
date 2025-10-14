import React, { useState } from "react";
import {
  User,
  Lock,
  School,
  Shield,
  GraduationCap,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Helper for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// A simple SVG spinner component for the loading animation
const Spinner = () => (
    <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);


export default function Login() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#F0FDF4", color: "#166534" } },
          error: { style: { background: "#FEF2F2", color: "#B91C1C" } },
        }}
      />
      <AuthPage />
    </>
  );
}

function AuthPage() {
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData(initialFormData);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Attempting to log in...");

    try {
      const payload = { ...formData, role };
      const url = `${import.meta.env.VITE_API_URL}/login`;
      const response = await axios.post(url, payload);
      const { user } = response.data.data;

      // Assuming your API returns a user object with an '_id' field
      if (!user._id) {
          throw new Error("User ID not found in API response.");
      }

      toast.success(`🎉 Welcome back, ${user.name}! Redirecting...`, { id: toastId });
      
      // --- MODIFIED SECTION ---
      // Include the user's _id in the data to be encrypted.
      const userData = {
        id: user._id, // User's unique identifier
        username: user.username,
        name: user.name,
        role: user.role,
        college: user.collegeName || "N/A",
        email: user.email || "N/A"
      };

      // 1. Convert the user data object to a JSON string.
      const userJson = JSON.stringify(userData);
      // 2. Encrypt the JSON string using Base64 encoding.
      const encodedData = btoa(userJson);
      // 3. Make the encrypted string safe for use in a URL.
      const encodedParam = encodeURIComponent(encodedData);

      let dashboardPath = '/dashboard';
      switch (user.role) {
        case 'student':
          dashboardPath = '/student-dashboard';
          break;
        case 'admin':
          dashboardPath = '/admin-dashboard';
          break;
        case 'super_admin':
          dashboardPath = '/super-admin-dashboard';
          break;
      }
      
      setTimeout(() => {
        navigate(`${dashboardPath}?data=${encodedParam}`);
      }, 1000);

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage, { id: toastId });
      console.error("API Error:", error.response || error);
      setLoading(false); // Stop loading on error
    } 
    // No finally block needed, as we only want to stop loading on failure.
    // On success, the component will unmount upon navigation.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mt-2">
              Please select your role to log in.
            </p>
          </div>
          <div className="flex justify-center bg-emerald-100 rounded-full p-1 mb-6">
            <RoleTab
              icon={<GraduationCap size={18} />}
              label="Student"
              roleName="student"
              activeRole={role}
              onClick={handleRoleChange}
            />
            <RoleTab
              icon={<School size={18} />}
              label="Admin"
              roleName="admin"
              activeRole={role}
              onClick={handleRoleChange}
            />
            <RoleTab
              icon={<Shield size={18} />}
              label="Super Admin"
              roleName="super_admin"
              activeRole={role}
              onClick={handleRoleChange}
            />
          </div>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <InputField
              icon={<User />}
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <InputField
              icon={<Lock />}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:scale-105 duration-300 flex items-center justify-center gap-2 disabled:bg-emerald-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Logging In...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const RoleTab = ({ icon, label, roleName, activeRole, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(roleName)}
    className={cn(
      "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none",
      activeRole === roleName
        ? "bg-white text-emerald-600 shadow-md"
        : "text-gray-500 hover:bg-emerald-200"
    )}
  >
    {icon} {label}
  </button>
);

const InputField = ({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-emerald-500"
      )}
    />
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

