import {
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
const StudentTable = ({ students, onToggleStatus }) => {
  if (students.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No students found for this college.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Username / Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Course / Year
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
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
                <br />
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.course || "N/A"}
                <br />
                Year: {student.year || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => onToggleStatus(student._id, student.status)}
                  title={`Click to set to ${
                    student.status === "Active" ? "Inactive" : "Active"
                  }`}
                >
                  {student.status === "Active" ? (
                    <ToggleRight size={24} className="text-green-500" />
                  ) : (
                    <ToggleLeft size={24} className="text-red-500" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default StudentTable;