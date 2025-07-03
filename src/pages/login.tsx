import type { UserType } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic input validation
    if (!email || !password) return setError("All fields are required.");
    if (!email.match(/^\S+@\S+\.\S+$/))
      return setError("Invalid email format.");

    // Get all users
    const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Find matching user
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) return setError("Invalid email or password.");

    if (!user.verified) {
      alert(
        "Your account is not verified yet. Please wait for admin approval.",
      );
      return;
    }

    // Save login session
    localStorage.setItem("userlogin", JSON.stringify(user));

    // Navigate to home/dashboard
    navigate("/");
  };

  useEffect(() => {
    const current = localStorage.getItem("userlogin");

    if (current) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="w-[400px] p-6 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full h-10 px-2 border rounded-md"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full h-10 px-2 mb-4 border rounded-md"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="cursor-pointer w-full bg-green-700 text-white border py-2 rounded-md "
          >
            Login
          </button>

          <div className="text-sm text-center">
            <Link to="/forgot-password" className="text-blue-600">
              Forgot Password?
            </Link>
            <br className="mb-1" />
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
