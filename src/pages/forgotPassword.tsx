import { useState } from "react";
import { Link } from "react-router-dom";
import type { UserType } from "@/types";

const ForgotPassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const stored = localStorage.getItem("users");
    if (!stored) return setError("No users found.");

    const users: UserType[] = JSON.parse(stored);
    const exists = users.find((u) => u.email === email);
    if (!exists) return setError("Email not found.");

    setStep(2);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) return setError("Password too short.");

    const stored = localStorage.getItem("users");
    if (!stored) return setError("No users found.");

    let users: UserType[] = JSON.parse(stored);
    users = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u,
    );
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Password updated successfully!");
    setStep(1);
    setEmail("");
    setNewPassword("");
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="w-[400px] p-6 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              className="w-full h-10 px-2 mb-4 border rounded-md"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {message && (
              <p className="text-green-600 text-sm text-center">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full h-10 px-2 mb-4 border rounded-md"
            >
              Find My Account
            </button>
            <p className="text-sm text-center mt-4">
              <Link to="/login" className="text-blue-600">
                Back to Login
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input
              className="w-full h-10 px-2 mb-4 border rounded-md"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {message && (
              <p className="text-green-600 text-sm text-center">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="cursor-pointer w-full bg-green-700 text-white border py-2 rounded-md "
            >
              Reset Password
            </button>
            <p className="text-sm text-center mt-4">
              <button type="button" onClick={() => setStep(1)}>
                Back
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
