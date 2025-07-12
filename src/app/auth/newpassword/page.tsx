"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [equal, setEqual] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailId = searchParams.get("email");
    if (emailId) setEmail(emailId);
  }, [searchParams]);

  useEffect(() => {
    if (newPassword === confirmPassword && newPassword.length > 7) {
      setEqual(false);
    } else {
      setEqual(true);
    }
  }, [confirmPassword, newPassword]);

  const onResetPassword = async () => {
    if (equal) {
      toast.error("Passwords do not match or are too short!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/newpassword", {
        email,
        newPassword,
      });
      console.log(response);
      toast.success("Password reset successfully!");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2fb] p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-[#7494ec] shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Reset Your Password
        </h1>

        <div className="space-y-5">
          {/* New Password Field */}
          <div className="relative">
            <label
              htmlFor="newpassword"
              className="block text-sm font-medium text-white mb-1"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-transparent rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:border-[#5e7fd6]"
              placeholder="Enter new password"
            />
            <button
              type="button"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            >
              {showNewPassword ? (
                // Eye Icon (visible)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // EyeOff Icon (hidden)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9 0-1.18.261-2.306.75-3.325M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-white mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-transparent rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:border-[#5e7fd6]"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? (
                // Eye Icon (visible)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // EyeOff Icon (hidden)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9 0-1.18.261-2.306.75-3.325M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Reset Password Button */}
          <button
            disabled={equal || loading}
            onClick={onResetPassword}
            className={`w-full px-4 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                equal || loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white text-[#547dec] hover:bg-[#eef2fb] hover:text-black hover:scale-105 cursor-pointer"
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

function NewPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordPage />
    </Suspense>
  );
}

export default NewPasswordPageWrapper;
