import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordApi } from "../utils/fetchForgotPassword";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ error: "", message: "", loading: false });
  const router = useRouter();
  useEffect(() => {
    if (status.error) setStatus((prev) => ({ ...prev, error: "" }));
  }, [email]);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSendOtp = async () => {
    setStatus({ error: "", message: "", loading: true });

    try {
      if (!email) throw new Error("Please enter your email.");
      if (!isValidEmail(email)) throw new Error("Please enter a valid email address.");

      const res = await forgotPasswordApi(email);

      if (res?.detail?.toLowerCase().includes("otp")) {
        setStatus({ error: "", message: res.detail, loading: false });
        setTimeout(() => {
          router.push(`/authentication/verify-otp?email=${encodeURIComponent(email)}`);
        }, 1200);
      } else {
        throw new Error(res?.detail || res?.error || "Error sending OTP.");
      }
    } catch (err: unknown) {
     let errorMessage = "Failed to send OTP. Please try again later.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setStatus({ 
        error: errorMessage, 
        message: "", 
        loading: false 
      });
    }
  };

  return {
    email,
    setEmail,
    error: status.error,
    message: status.message,
    loading: status.loading,
    handleSendOtp,
  };
}
