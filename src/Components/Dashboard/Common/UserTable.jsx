import {
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const UserTable = ({ users, onToggleStatus }) => {
  if (users.length === 0)
    return <p className="text-center text-gray-500 py-8">No users found.</p>;
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
              College
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.username}
                <br />
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.collegeName || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => onToggleStatus(user._id, user.status)}
                  title={`Click to set to ${
                    user.status === "Active" ? "Inactive" : "Active"
                  }`}
                >
                  {user.status === "Active" ? (
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

export default UserTable;