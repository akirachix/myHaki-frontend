"use client";
import { useEffect } from "react";
import { useForgotPassword } from "../../hooks/useFetchForgotPassword";

export default function ForgotPasswordPage() {
  const { email, setEmail, error, message, loading, handleSendOtp } =
    useForgotPassword();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSendOtp();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center text-[#762323] mb-10">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-gray-900 ml-2 mb-3 font-medium"
          >
            Enter your Admin Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 text-black rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#a7744a] w-full"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          {loading && (
            <p className="text-[#7e5b32] mb-4">
              Sending OTP to <span className="font-semibold">{email}</span> ...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#a7744a] hover:bg-[#7e5b32] text-white font-semibold py-3 rounded-md transition w-full cursor-pointer"
          >
            Send OTP
          </button>
        </form>
      </div>
      <div className="relative h-[280px] overflow-hidden shadow-lg">
        <img
          src="/images/lowerpart.png"
          alt="Gavel"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
