import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  LogOut,
  Loader,
  Save,
  Shield,
  UserPlus,
  ToggleLeft,
  ToggleRight,
  X,
  Edit,
} from "lucide-react";

import EditProfileModal from "./Common/EditProfileModal.jsx";
import CreateAdminModal from "./Common/CreateAdminModal.jsx";
import UserTable from "./Common/UserTable.jsx";
import TabButton from "./Common/TabButton.jsx";
// --- Main Super Admin Dashboard Component ---
export default function SuperAdminDashboard1() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("admins");
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [superAdminData, setSuperAdminData] = useState(() => {
    const encodedData = searchParams.get("data");
    if (!encodedData) {
      navigate("/");
      return null;
    }
    try {
      return JSON.parse(atob(decodeURIComponent(encodedData)));
    } catch (err) {
      toast.error("Invalid session. Redirecting to login.");
      navigate("/");
      return null;
    }
  });

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!superAdminData) return;
    const fetchUsers = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users?role=super_admin`
        );
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to load user list.");
        toast.error(
          err.response?.data?.message || "Could not fetch user data."
        );
      } finally {
        setIsFetching(false);
      }
    };
    fetchUsers();
  }, [superAdminData]);

  // --- API HANDLERS ---
  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    const toastId = toast.loading(`Updating status...`);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/status`,
        { status: newStatus }
      );
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
      );
      toast.success("Status updated successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.", {
        id: toastId,
      });
    }
  };

  const handleCreateAdmin = async (adminData) => {
    const toastId = toast.loading("Creating new admin...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/admins`,
        adminData
      );
      setUsers([...users, response.data.data]);
      toast.success("Admin created successfully!", { id: toastId });
      setIsCreateAdminModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin.", {
        id: toastId,
      });
    }
  };

  // --- Handler for updating the Super Admin's own profile ---
  const handleProfileUpdate = async (profileData) => {
    const toastId = toast.loading("Updating your profile...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${superAdminData.id}/profile`,
        profileData
      );

      setSuperAdminData((prev) => ({ ...prev, name: response.data.data.name }));
      toast.success("Profile updated successfully!", { id: toastId });
      setIsProfileModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.", {
        id: toastId,
      });
    }
  };

  // --- RENDER LOGIC ---
  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin text-teal-600" size={48} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const adminUsers = users.filter((u) => u.role === "admin");
  const studentUsers = users.filter((u) => u.role === "student");

  return (
    <>
      <Toaster position="top-right" />
      {isCreateAdminModalOpen && (
        <CreateAdminModal
          onClose={() => setIsCreateAdminModalOpen(false)}
          onSubmit={handleCreateAdmin}
        />
      )}
      {isProfileModalOpen && (
        <EditProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          onSubmit={handleProfileUpdate}
          initialData={superAdminData}
        />
      )}

      <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
        <aside className="w-64 bg-gray-800 text-white flex-col shrink-0 hidden md:flex">
          <div className="p-6 text-2xl font-bold border-b border-gray-700">
            Super Admin
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-600 font-semibold"
            >
              <Shield size={20} /> Manage Users
            </a>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <LogOut size={20} /> Logout
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <header className="flex justify-between items-center pb-6 border-b">
            <div>
              <h1 className="text-3xl font-bold text-gray-700">
                User Management
              </h1>
              <p className="text-lg text-gray-500 mt-1">
                Welcome, {superAdminData?.name ?? "Super Admin"}
              </p>
            </div>
            {/* ---Header buttons --- */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Edit size={18} />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setIsCreateAdminModalOpen(true)}
                className="flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <UserPlus size={18} />
                <span>Create Admin</span>
              </button>
            </div>
          </header>

          <div className="mt-8">
            <div className="flex border-b">
              <TabButton
                title={`Admins (${adminUsers.length})`}
                isActive={activeTab === "admins"}
                onClick={() => setActiveTab("admins")}
              />
              <TabButton
                title={`Students (${studentUsers.length})`}
                isActive={activeTab === "students"}
                onClick={() => setActiveTab("students")}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              {activeTab === "admins" && (
                <UserTable
                  users={adminUsers}
                  onToggleStatus={handleToggleStatus}
                />
              )}
              {activeTab === "students" && (
                <UserTable
                  users={studentUsers}
                  onToggleStatus={handleToggleStatus}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}








// ---  Modal component for editing the Super Admin's profile ---

