'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Layout from '../shared-components/Layout';
import { User } from '../utils/type';
import { fetchUserById, fetchUpdateUsers } from '../utils/fetchProfile';

type UpdateUserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formState, setFormState] = useState<UpdateUserData>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }
    fetchUserById(userId)
      .then((data) => {
        setUser(data);
        setFormState({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number ?? '',
          password: '',
        });
        setPreviewImage(data.image ?? null);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, [router]);

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof UpdateUserData) {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSave() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
    router.push('/login'); 
    setSuccessMessage(null);
      return;
    }

    if (!formState.first_name.trim() || !formState.last_name.trim() || !formState.email.trim()) {
      setError('Please fill all required fields.');
      setSuccessMessage(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address.');
      setSuccessMessage(null);
      return;
    }

    setError(null);
    setSuccessMessage(null);

    const payload: UpdateUserData = {
      first_name: formState.first_name,
      last_name: formState.last_name,
      email: formState.email,
      phone_number: formState.phone_number,
    };
    if (formState.password && formState.password.trim() !== '') {
      payload.password = formState.password.trim();
    }

    try {
      const updatedUser = await fetchUpdateUsers(userId, payload);
      if (!updatedUser) {
        setError('Failed to update profile: No response from server.');
        return;
      }
      setUser(updatedUser);
      setEditing(false);
      setSuccessMessage('Profile updated successfully');
      setImageFile(null);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
      setSuccessMessage(null);
    }
  }

  function handleCancel() {
    if (user) {
      setFormState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number ?? '',
        password: '',
      });
      setPreviewImage(user.image ?? null);
      setImageFile(null);
    }
    setEditing(false);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    setError(null);
    setSuccessMessage(null);
  }

  return (
    <div className="overflow-y-hidden">
      <Layout>
        <main className="flex-grow max-w-4xl mx-auto py-10 px-6 bg-white rounded">
          {loading ? (
            <p className="text-center mt-20">Loading...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
              <div className="flex justify-center items-center mb-4 relative">
                <div
                  onClick={handleImageClick}
                  className="cursor-pointer rounded-full w-40 h-40 overflow-hidden border border-gray-300"
                  title="Click to change profile image"
                  aria-label="Profile image upload"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-5xl text-gray-600">
                      {user?.first_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleImageClick}
                  aria-label="Edit profile image"
                  title="Edit profile image"
                  className="-ml-8 p-2 bg-white mt-25 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#7B1824]"
                  style={{ fontSize: '24px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#7B1824]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 17.25V21h3.75L17.81 10.94l-3.75-3.75L4 17.25z" />
                  </svg>
                </button>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{user?.first_name} {user?.last_name}</h2>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              <div className="text-center mb-4 min-h-[1.25rem]">
                {error && <p className="text-red-600">{error}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}
              </div>
              <form className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto" encType="multipart/form-data" onSubmit={e => e.preventDefault()}>
                <div>
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-black">First Name</label>
                  <input id="first_name" type="text" required value={formState.first_name} onChange={e => handleInputChange(e, 'first_name')} disabled={!editing} className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7B1824] cursor-pointer focus:cursor-text" />
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2 font-semibold text-black">Last Name</label>
                  <input id="last_name" type="text" required value={formState.last_name} onChange={e => handleInputChange(e, 'last_name')} disabled={!editing} className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7B1824] cursor-pointer focus:cursor-text" />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block mb-2 font-semibold text-black">Password</label>
                  <input id="password" type={showPassword ? 'text' : 'password'} value={formState.password} onChange={e => handleInputChange(e, 'password')} placeholder="Enter new password" disabled={!editing} className="w-full rounded-lg border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#7B1824] cursor-pointer focus:cursor-text" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[45px] text-gray-500 hover:text-gray-800" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-3.582-10-8s4.477-8 10-8c1.27 0 2.485.3 3.613.825m2.512 2.097a9.995 9.995 0 012.503 5.078M3 3l18 18" /></svg>}
                  </button>
                </div>
                <div>
                  <label htmlFor="phone_number" className="block mb-2 font-semibold text-black">Phone number</label>
                  <input id="phone_number" type="text" value={formState.phone_number} onChange={e => handleInputChange(e, 'phone_number')} disabled={!editing} className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7B1824] cursor-pointer focus:cursor-text" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-black">Email</label>
                  <input id="email" type="email" required value={formState.email} onChange={e => handleInputChange(e, 'email')} disabled={!editing} className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#7B1824] cursor-pointer focus:cursor-text" />
                </div>
                <div>
                  <label htmlFor="role" className="block mb-2 font-semibold text-black">Role</label>
                  <input id="role" type="text" value={user?.role || ''} disabled className="w-full rounded-lg border border-gray-300 p-3 bg-gray-100 cursor-not-allowed" />
                </div>
                <div className="col-span-2 flex justify-center space-x-6 mt-10">
                  {!editing ? (
                    <button type="button" onClick={() => setEditing(true)} className="bg-[#A97B5A] text-white rounded-full px-8 py-3 font-semibold text-lg hover:bg-[#8B6239] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A97B5A]" style={{ boxShadow: 'none' }}>
                      Update
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={handleSave} className="bg-[#A97B5A] text-white rounded-full px-8 py-3 font-semibold text-lg hover:bg-[#8B6239] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A97B5A]" style={{ boxShadow: 'none' }}>
                        Save
                      </button>
                      <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 rounded-full px-8 py-3 font-semibold text-lg hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" style={{ boxShadow: 'none' }}>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </>
          )}
        </main>
      </Layout>
    </div>
  );
}
