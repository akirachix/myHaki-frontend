import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpApi } from "../utils/fetchVerifyOtp";
import { forgotPasswordApi as sendOtpApi} from "../utils/fetchForgotPassword"; 

export function useVerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (error) setError(""); 
  }, [otp]);

  function isValidOtp(value: string) {
    return /^\d{4}$/.test(value); 
  }

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email not loaded. Please go back and try again.");
      return;
    }
    if (!isValidOtp(otp)) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtpApi(email, otp);

      if (res.detail.toLowerCase().includes("verified")) {
        setMessage(res.detail.trim());
        setTimeout(() => {
          router.push(`/authentication/reset-password?email=${encodeURIComponent(email)}`);
        }, 1200);
      } else {
        throw new Error(
          res.detail?.trim() ||
          res.error?.trim() ||
          "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      setError(
        (error as Error).message ||
        "Failed to verify OTP. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Email not loaded. Please go back and try again.");
      return;
    }

    setResendLoading(true);
    setError("");
    setResendMessage("");
    try {
      const res = await sendOtpApi(email);
      setResendMessage(res.detail || "OTP has been resent to your email.");
    } catch (err) {
      setError(
        (err as Error).message || "Failed to resend OTP. Please try again later."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    error,
    message,
    loading,
    resendLoading,
    resendMessage,
    handleVerifyOtp,
    handleResendOtp,
    email,
  };
}
