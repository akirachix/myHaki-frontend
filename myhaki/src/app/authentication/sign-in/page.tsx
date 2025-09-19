"use client";

import Image from "next/image";
import { useState } from "react";
import { useSignIn } from "@/app/hooks/useFetchSignIn";

export default function SignInPage() {
  const { email, setEmail, password, setPassword, error, message, handleSignIn } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn();
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-200 relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/signin-images/signinimage.png"
            alt="Sign In"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8">
        <h1 className="text-4xl font-bold text-[#7B1824] mb-10 mt-6 text-center">Sign In</h1>
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border rounded w-full py-2 px-3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-2 relative">
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="border rounded w-full py-2 pr-10 pl-3 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              tabIndex={-1}
              className="absolute right-4 top-13 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {!showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-3.582-10-8s4.477-8 10-8c1.27 0 2.485.3 3.613.825m2.512 2.097a9.995 9.995 0 012.503 5.078M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-end mb-6">
            <a
              href="/authentication/forgot-password"
              className="text-xs text-gray-600 no-underline hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
          {message && <div className="mb-4 text-green-600 text-sm text-center">{message}</div>}

          <button 
            type="submit"
            className="w-62 bg-[#A97B5A] ml-16 text-white py-2 rounded mt-2 font-semibold"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
