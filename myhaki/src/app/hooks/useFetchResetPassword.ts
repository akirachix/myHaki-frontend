'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordApi } from "../utils/fetchResetPassword";

export function useResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (error) setError("");
  }, [password, confirmPassword]);

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is missing. Please go back and try again.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordApi(email, password, confirmPassword);

      if (!res || !res.detail) {
        throw new Error("Unexpected response from server.");
      }

      if (res.detail.toLowerCase().includes("successful")) {
        setMessage(res.detail.trim());
        setTimeout(() => {
          router.push("/authentication/sign-in");
        }, 1500);
      } else {
        throw new Error(res.detail.trim() || "Error resetting password.");
      }
    } catch (error) {
      setError((error as Error).message || "Failed to reset password. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    message,
    loading,
    handleResetPassword,
  };
}
