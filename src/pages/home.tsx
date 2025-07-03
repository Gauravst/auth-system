import type { UserType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userlogin");
    if (stored) {
      try {
        const parsed: UserType = JSON.parse(stored);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userlogin");
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">No user logged in</h2>
          <button
            className="cursor-pointer mt-4 w-full text-black border py-2 rounded-md "
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="">
          Email: <span className="font-medium">{user.email}</span>
        </p>
        <p className="text-gray-600">
          Role: <span className="font-medium capitalize">{user.role}</span>
        </p>

        <div className="flex gap-2">
          <button
            className="cursor-pointer mt-4 w-full text-black border py-2 rounded-md "
            onClick={handleDashboard}
          >
            Dashboard
          </button>

          <button
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
