"use client";
import { useEffect, useState } from "react";
import { useResetPassword } from "../../hooks/useFetchResetPassword";

function PasswordInputWithToggle({
  label,
  id,
  value,
  onChange,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-6">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-800">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        className="border border-gray-300 text-black rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#a7744a]"
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="new-password"
      />
      <button
        type="button"
        className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a9.963 9.963 0 014-4.243M9.878 9.879a3 3 0 104.243 4.242"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function ResetPasswordPage() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    message,
    handleResetPassword,
  } = useResetPassword();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleResetPassword();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex mt-12 flex-col justify-center max-w-md w-full mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center text-[#762323] mb-10">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <PasswordInputWithToggle
            label="New Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInputWithToggle
            label="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <button
            type="submit"
            className="bg-[#a7744a] hover:bg-[#7e5b32] text-white font-semibold py-3 rounded-md transition w-full cursor-pointer"
          >
            Change Password
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
