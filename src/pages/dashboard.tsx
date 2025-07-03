import type { UserType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const current = localStorage.getItem("userlogin");

    if (!current) {
      navigate("/login");
      return;
    }

    try {
      const user: UserType = JSON.parse(current);

      // Check role and verification
      if (user.role !== "admin") {
        alert("Access denied: Admins only.");
        navigate("/login");
        return;
      }

      if (!user.verified) {
        alert("Access denied: Admin is not verified.");
        navigate("/login");
        return;
      }

      // load users
      const stored = localStorage.getItem("users");
      if (stored) {
        setUsers(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Invalid user session", err);
      navigate("/login");
    }
  }, [navigate]);

  const handleVerify = (email: string) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, verified: true } : u,
    );
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleDelete = (email: string) => {
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Verified</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  {user.verified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleVerify(user.email)}
                    disabled={user.verified}
                    className={`${user.verified ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-pointer"} h-8 text-white px-3 py-1 rounded `}
                  >
                    {user.verified ? "Verified" : "Verify"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer h-8"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
