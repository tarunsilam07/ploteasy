"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer countdown
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const onResetPassword = async () => {
    // Close any previous empty-email toast
    toast.dismiss("empty-email-error");

    if (!email.trim()) {
      toast.error("Please enter your email.", { id: "empty-email-error" });
      return;
    }

    if (loading || timer > 0) return;

    setMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgotpassword", { email });
      console.log(response);
      setMessage("Email sent to reset password");
      toast.success("Email sent to reset password");
      setTimer(30); // Start 30s cooldown
    } catch (error) {
      const errorMsg = "An error occurred";
      console.log(error)
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !email.trim() || loading || timer > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eef2fb] p-4 sm:p-6">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#7494ec] rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">
        <h1 className="text-lg sm:text-2xl font-bold text-center text-white mb-3 sm:mb-4">
          Forgot Password
        </h1>
        <p className="text-sm sm:text-base text-white text-center mb-5 sm:mb-6">
          Enter your email to reset your password
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 rounded-lg bg-white text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-300 hover:border-[#5e7fd6]"
        />

        <button
          onClick={onResetPassword}
          disabled={isDisabled}
          className={`w-full mt-4 py-2 sm:py-3 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            isDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-[#547dec] hover:bg-[#eef2fb] hover:text-black hover:scale-105 cursor-pointer"
          }`}
        >
          {loading
            ? "Sending..."
            : timer > 0
            ? `Resend in ${timer}s`
            : "Reset Password"}
        </button>

        {message && (
          <p className="mt-3 text-sm text-white text-center">{message}</p>
        )}
        {errorMessage && (
          <p className="mt-3 text-sm text-red-100 text-center">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
