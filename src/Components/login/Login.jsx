import React, { useState } from "react";
import {
  User,
  Lock,
  School,
  UserPlus,
  Shield,
  GraduationCap,
  Building,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// 1. Import useNavigate for redirection
import { useNavigate } from "react-router-dom";

// Helper for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

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
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("admin");
  const initialFormData = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    grade: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // 2. Initialize the navigate function
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFormData(initialFormData);
    setErrors({});
  };
    // -----------------Input Validation-----------------
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (mode === "register") {
      if (!formData.name) newErrors.name = "Name is required.";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
      if (role === "admin" || role === "student") {
        if (!formData.collegeName)
          newErrors.collegeName = "College name is required.";
      }
      if (role === "student") {
        if (!formData.grade) newErrors.grade = "Grade is required.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const payload = { ...formData, role };
        const endpoint = mode === "login" ? "login" : "register";
        const url = `${import.meta.env.VITE_API_URL}/${endpoint}`;
        const response = await axios.post(url, payload);

        if (mode === "login") {
          const { user } = response.data.data;
          toast.success(`🎉 Welcome back, ${user.name}!`);

          // -------------------Prepare user data object for encoding
          const userData = {
            username: user.username,
            name: user.name,
            role: user.role,
            college: user.collegeName || "N/A",
            isStudent: user.role === "student" ? "y" : "n",
          };

          // Encode the object and navigate
          const userJson = JSON.stringify(userData);

          // Encode the string using btoa()
          const encodedData = btoa(userJson);

          // Navigate with a single, clean 'data' parameter
          navigate(`/dashboard?data=${encodeURIComponent(encodedData)}`);
        } else {
          toast.success("Registration successful! Please log in.");
          handleModeChange("login");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || `An error occurred during ${mode}.`;
        toast.error(errorMessage);
        console.error("API Error:", error.response || error);
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderFields = () => {
    const isRegister = mode === "register";
    return (
      <>
        {isRegister && (
          <InputField
            icon={<UserPlus />}
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}
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
        {isRegister && (
          <InputField
            icon={<Lock />}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        )}
        {isRegister && (role === "admin" || role === "student") && (
          <InputField
            icon={<Building />}
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            error={errors.collegeName}
          />
        )}
        {isRegister && role === "student" && (
          <InputField
            icon={<GraduationCap />}
            name="grade"
            placeholder="Current Grade (e.g., A+)"
            value={formData.grade}
            onChange={handleChange}
            error={errors.grade}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {mode === "login" ? "Welcome Back!" : "Create an Account"}
            </h1>
            <p className="text-gray-500 mt-2">
              {mode === "login" ? "Log in as a..." : "Register as a..."}
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
            {renderFields()}
            <button
              type="submit"
              className="w-full mt-4 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105 duration-300"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                handleModeChange(mode === "login" ? "register" : "login")
              }
              className="font-semibold text-emerald-600 hover:text-emerald-800 ml-1 focus:outline-none"
            >
              {mode === "login" ? "Register here" : "Login here"}
            </button>
          </p>
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
