'use client';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useFetchSignin from '@/app/hooks/useFetchSignIn';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, loading, error } = useFetchSignin();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault(); 
  try {
    await signin(email, password); 
    router.push('/dashboard');     
  } catch (err: any) {
    console.error(err);
  }
}


  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-200 relative hidden md:block">
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
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto" noValidate>
          <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="border rounded w-full py-2 px-3 mb-6 focus:outline-none"
          />


          <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border rounded w-full py-2 px-3 pr-10 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>


          <div className="flex justify-end mb-6 mt-3">
            <a
              href="/authentication/forgot-password"
              className="text-xs text-gray-600 no-underline hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {error && (
            <p className="mb-4 text-red-600 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-3/4 bg-[#A97B5A] hover:bg-[#8b6344] disabled:opacity-50 text-white py-2 ml-10 rounded font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
