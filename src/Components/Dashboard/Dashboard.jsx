import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  Shield,
  Building,
  LogOut,
  Edit,
  Save,
  XCircle,
  Loader,
} from "lucide-react";

// --- Main Dashboard Component ---
export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Get the single 'data' parameter from the URL.
  const encodedData = searchParams.get("data");
  let userData = {}; // Use let to create a mutable object.

  // 2. Decode and parse the data in a try...catch block to handle errors.
  if (encodedData) {
    try {
      const decodedJson = atob(decodeURIComponent(encodedData));
      userData = JSON.parse(decodedJson);
    } catch (error) {
      console.error("Failed to parse user data from URL:", error);
      // If data is bad, redirect to the login page.
      navigate("/"); 
    }
  }

  // 3. Destructure the userData object to get your variables back.
  const { name, role, college, username, isStudent } = userData;

  // State for student data, loading, and editing
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for inline editing
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [newGrade, setNewGrade] = useState("");


useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          role,
          collegeName: college || "",
          username,
        });

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/students?${params.toString()}`
        );
        
        // This is the data for ALL students returned by the API
        const allStudents = response.data.data;

        // ** THIS IS THE CORRECTED LOGIC **
        if (isStudent === 'y') {
          // Filter the full list to find only the student who is currently logged in
          const currentUserData = allStudents.filter(
            (student) => {
              console.log("STUDENT USERNAME:", username);
              if (student.username === username) {
                return username
              }
            }
          );
          // Set the state with an array containing only that single student
          setStudents(currentUserData);
        } else {
          // If the user is an admin, show all students
          setStudents(allStudents);
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch student data. Please try again later.");
        toast.error(
          err.response?.data?.message || "Could not load student data."
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [name, role, college, username, isStudent, navigate]); 
  // Group students by their college name for display
  const groupedStudents = students.reduce((acc, student) => {
    const collegeKey = student.collegeName || "Unaffiliated";
    if (!acc[collegeKey]) {
      acc[collegeKey] = [];
    }
    acc[collegeKey].push(student);
    return acc;
  }, {});

  // --- Event Handlers for Editing ---
  const handleEditClick = (student) => {
    setEditingStudentId(student._id);
    setNewGrade(student.grade);
  };

  const handleCancelClick = () => {
    setEditingStudentId(null);
    setNewGrade("");
  };

  const handleSaveClick = async (studentId) => {
    if (!newGrade.trim()) {
      toast.error("Grade cannot be empty.");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/students/${studentId}`, {
        grade: newGrade,
      });
      setStudents(
        students.map((s) =>
          s._id === studentId ? { ...s, grade: newGrade } : s
        )
      );
      toast.success("Grade updated successfully!");
      handleCancelClick();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update grade.");
      console.error("Update error:", err);
    }
  };

  // --- Render Logic ---
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <UserInfoHeader name={name} role={role} college={college} />

          <div className="mt-8 bg-white shadow-2xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Student Records
            </h2>

            {loading && (
              <div className="flex justify-center py-12">
                <Loader className="animate-spin" size={48} color="#10B981" />
              </div>
            )}
            {error && <p className="text-center text-red-600 py-8">{error}</p>}

            {!loading && !error && (
              <div className="space-y-8">
                {Object.keys(groupedStudents).length > 0 ? (
                  Object.keys(groupedStudents).map((collegeName) => (
                    <div key={collegeName}>
                      <h3 className="text-xl font-semibold text-emerald-700 mb-4 border-b-2 border-emerald-200 pb-2">
                        {collegeName}
                      </h3>
                      <div className="overflow-x-auto">
                        <StudentTable
                          students={groupedStudents[collegeName]}
                          currentUserRole={role}
                          editingStudentId={editingStudentId}
                          newGrade={newGrade}
                          onEdit={handleEditClick}
                          onSave={handleSaveClick}
                          onCancel={handleCancelClick}
                          onGradeChange={setNewGrade}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No student records found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// --- UI Sub-components ---
const UserInfoHeader = ({ name, role, college }) => (
  <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-4">
      <div className="bg-emerald-100 p-3 rounded-full">
        <User className="text-emerald-600" size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <div className="flex items-center gap-4 mt-1 text-gray-500">
          <span className="flex items-center gap-1.5 capitalize">
            <Shield size={16} /> {role.replace("_", " ")}
          </span>
          {college && college !== "N/A" && (
            <span className="flex items-center gap-1.5">
              <Building size={16} /> {college}
            </span>
          )}
        </div>
      </div>
    </div>
    <Link
      to="/"
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </Link>
  </div>
);

const StudentTable = ({
  students,
  currentUserRole,
  editingStudentId,
  newGrade,
  onEdit,
  onSave,
  onCancel,
  onGradeChange,
}) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Username
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Grade
        </th>
        {(currentUserRole === "admin" || currentUserRole === "super_admin") && (
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        )}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {students.map((student) => (
        <tr key={student._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {student.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {student.username}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {editingStudentId === student._id ? (
              <input
                type="text"
                value={newGrade}
                onChange={(e) => onGradeChange(e.target.value)}
                className="w-20 p-1 border border-emerald-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                autoFocus
              />
            ) : (
              student.grade
            )}
          </td>
          {(currentUserRole === "admin" ||
            currentUserRole === "super_admin") && (
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
              {editingStudentId === student._id ? (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onSave(student._id)}
                    className="text-emerald-600 hover:text-emerald-900"
                    title="Save"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={onCancel}
                    className="text-red-600 hover:text-red-900"
                    title="Cancel"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onEdit(student)}
                  className="text-emerald-600 hover:text-emerald-900"
                  title="Edit Grade"
                >
                  <Edit size={20} />
                </button>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);
