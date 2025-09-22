"use client";
import React, { useEffect } from "react";
import { useVerifyOtp } from "../../hooks/useFetchVerifyOtp";
import { useForgotPassword } from "../../hooks/useFetchForgotPassword";
import Image from "next/image";


interface OTPVariables{
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
}
function OTPInput({ length = 4, value, onChange, disabled }: OTPVariables) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>(
    new Array(length).fill(null)
  );
  const otpArr = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleChange = (val: string, idx: number) => {
    if (disabled) return;
    if (!/^\d*$/.test(val)) return;
    const newOtp = otpArr.map((v, i) => (i === idx ? val : v)).join("");
    onChange(newOtp);
    if (val.length === 1 && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (disabled) return;
    if (e.key === "Backspace" && !otpArr[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-12 justify-center mb-6">
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            className={`w-14 h-14 border text-black border-gray-800 rounded-md text-center text-xl transition ${
              disabled ? "bg-gray-200 cursor-not-allowed opacity-70" : ""
            }`}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            value={otpArr[i]}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            autoComplete="one-time-code"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
    </div>
  );
}

export default function VerifyOtpPage() {
  
  const { otp, setOtp, error, message, loading, handleVerifyOtp, email } = useVerifyOtp();
  const { handleSendOtp, loading: resendLoading, message: resendMessage } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      await handleVerifyOtp();
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      await handleSendOtp(); 
    }
  };

  return (

    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center text-[#762323] mb-10">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="otp" className="block mb-2 font-medium text-gray-800">
            Enter the 4-digit code sent to your email
          </label>

          <OTPInput length={4} value={otp} onChange={setOtp} disabled={loading} />

          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
          {loading && <p className="text-[#a7744a] mb-4 text-center">Verifying OTP...</p>}
          {resendLoading && <p className="text-[#7e5b32] text-center mb-2">Resending OTP...</p>}
          {resendMessage && <p className="text-green-600 text-center mb-2">{resendMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#a7744a] hover:bg-[#7e5b32] text-white font-semibold py-3 rounded-md transition w-full ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-800">
          Didn’t receive an OTP?{" "}
          <span
            className={`${
              resendLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } text-[#762323] font-bold underline`}
            onClick={!resendLoading ? handleResendOtp : undefined}
          >
            Resend OTP
          </span>
        </div>
      </div>

      <div className="relative h-[280px] overflow-hidden shadow-lg">
        <Image
          src="/images/lowerpart.png"
          alt="Gavel"
          className="w-full object-cover"
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
}
