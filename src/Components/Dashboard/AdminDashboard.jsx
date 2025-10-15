import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { User, LogOut, Loader, UserPlus } from "lucide-react";

import AddStudentModal from "./Common/AddStudentModal.jsx";
import StudentTable from "./Common/StudentTable.jsx";
// --- Main Admin Dashboard Component ---
export default function AdminDashboard1() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adminData = useMemo(() => {
    const encodedData = searchParams.get("data");
    if (!encodedData) {
      navigate("/");
      return null;
    }
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(encodedData)));

      return { ...decoded, collegeName: decoded.college };
    } catch (err) {
      toast.error("Invalid session. Redirecting to login.");
      navigate("/");
      return null;
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (!adminData) return;

    const fetchStudents = async () => {
      setIsFetching(true);
      try {
        const params = new URLSearchParams({
          role: "admin",
          collegeName: adminData.collegeName,
        });
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users?${params.toString()}`
        );
        setStudents(response.data.data);
      } catch (err) {
        setError("Failed to load student list.");
        toast.error(
          err.response?.data?.message || "Could not fetch student data."
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchStudents();
  }, [adminData]);

  const handleToggleStatus = async (studentId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    const toastId = toast.loading(`Setting status to ${newStatus}...`);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${studentId}/status`,
        { status: newStatus }
      );
      setStudents(
        students.map((s) =>
          s._id === studentId ? { ...s, status: newStatus } : s
        )
      );
      toast.success("Status updated successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.", {
        id: toastId,
      });
    }
  };

  const handleAddStudent = async (studentData) => {
    const toastId = toast.loading("Creating new student account...");
    try {
      const payload = { ...studentData, collegeName: adminData.collegeName };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        payload
      );
      setStudents([...students, response.data.data]);
      toast.success("Student created successfully!", { id: toastId });
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create student.", {
        id: toastId,
      });
    }
  };

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

  return (
    <>
      <Toaster position="top-right" />
      {isModalOpen && (
        <AddStudentModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}

      <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
        <aside className="w-64 bg-teal-800 text-white flex-col shrink-0 hidden md:flex">
          <div className="p-6 text-2xl font-bold border-b border-teal-700">
            Admin Panel
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-600 font-semibold"
            >
              <User size={20} /> Manage Students
            </a>
          </nav>
          <div className="p-4 border-t border-teal-700">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <LogOut size={20} /> Logout
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <header className="flex justify-between items-center pb-6 border-b">
            <div>
              <h1 className="text-3xl font-bold text-gray-700">
                Student Management
              </h1>
              <p className="text-lg text-gray-500 mt-1">
                {adminData?.collegeName ?? "College"}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <UserPlus size={18} />
              <span>Add Student</span>
            </button>
          </header>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Student Roster ({students.length})
            </h2>
            <StudentTable
              students={students}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        </main>
      </div>
    </>
  );
}
