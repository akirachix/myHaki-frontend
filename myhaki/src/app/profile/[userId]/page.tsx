"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useProfile } from "@/app/hooks/useFetchUsers";
import Sidebar from "../../shared-components/SideBar";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const userId = params.userId;

  const {
    profile,
    loading,
    error,
    update,
    updating,
    updateError,
    updateSuccess,
  } = useProfile(userId);

  const [form, setForm] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        password: "",
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        role: profile.role || "",
        avatar: profile.avatar || "",
      });
      if (!avatarPreview) {
        setAvatarPreview(profile.avatar || "/images/profile-avatar.png");
      }
    }
  }, [profile]);

  if (loading || !form)
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  if (error)
    return (
      <div className="text-red-600 flex justify-center items-center min-h-screen">
        {error}
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setValidationErrors((prev: any) => ({ ...prev, [name]: undefined }));
    if (name === "avatar" && files && files[0]) {
      setForm((f: any) => ({ ...f, avatar: files[0] }));
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f: any) => ({ ...f, [name]: value }));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      await update(form);
      setValidationErrors({});
    } catch (err: any) {
      if (err.message) {
        try {
          const errObj = JSON.parse(err.message);
          setValidationErrors(errObj);
        } catch {
          setValidationErrors({ general: err.message });
        }
      }
    }
  };

  const renderError = (field: string) => {
    if (validationErrors && validationErrors[field]) {
      return <p className="text-red-600 mt-1">{validationErrors[field].join(", ")}</p>;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 min-w-[16rem]">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col items-center py-12 overflow-auto px-8">
        <h1 className="mb-8 text-[65px] font-bold font-nunito">Profile</h1>
        <div className="flex flex-col items-center mb-6 relative">
          <div className="relative">
            <Image
              src={avatarPreview || "/images/profile-avatar.png"}
              alt="User avatar"
              width={220}
              height={220}
              className="rounded-full border-4 border-white shadow object-cover"
              style={{ background: "#F1F1F1", width: "220px", height: "220px" }}
            />
            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-5 right-5 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
              aria-label="Edit Avatar"
              style={{ border: "1px solid #ccc" }}
            >
              <PencilIcon className="w-7 h-7 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
          <span className="mt-4 text-[65px] font-bold font-nunito">{form.first_name} {form.last_name}</span>
          <span className="text-gray-600 mb-2 text-xl font-medium">{form.email}</span>
        </div>

        <form className="grid grid-cols-2 gap-x-8 gap-y-6 w-full max-w-4xl mb-8" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block mb-2 font-medium text-xl">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium"
              value={form.first_name}
              onChange={handleChange}
              required
            />
            {renderError("first_name")}
          </div>
          <div>
            <label className="block mb-2 font-medium text-xl">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium"
              value={form.last_name}
              onChange={handleChange}
              required
            />
            {renderError("last_name")}
          </div>
          <div>
            <label className="block mb-2 font-medium text-xl">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {renderError("password")}
          </div>
          <div>
            <label className="block mb-2 font-medium text-xl">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium"
              value={form.phone}
              onChange={handleChange}
            />
            {renderError("phone")}
          </div>
          <div>
            <label className="block mb-2 font-medium text-xl">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium"
              value={form.email}
              onChange={handleChange}
              required
            />
            {renderError("email")}
          </div>
          <div>
            <label className="block mb-2 font-medium text-xl">Role</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="border rounded-lg w-full py-2 px-4 shadow focus:outline-none text-xl font-medium bg-gray-100 cursor-not-allowed"
              value={form.role}
              disabled
              readOnly
            />
          </div>
          <div className="col-start-2 mt-4 flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className="rounded-full bg-[#9C6846] text-white px-20 py-3 text-2xl font-bold shadow hover:bg-[#7a5135] transition"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
          {updateError && (
            <p className="text-red-600 col-span-2 text-center">{updateError}</p>
          )}
          {updateSuccess && (
            <p className="text-green-600 col-span-2 text-center">
              Profile updated successfully!
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
