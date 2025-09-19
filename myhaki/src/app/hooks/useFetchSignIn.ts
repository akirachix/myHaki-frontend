"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInApi } from "../utils/fetchSignIn";
import { setAuthToken, removeAuthToken } from "../utils/authToken";

export function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const response = await signInApi(email, password);

      if (response.token) {
        setAuthToken(response.token);
      } else {
        throw new Error("No token received from server");
      }

      if (response.role === "lsk_admin") {
        setMessage("Sign in successful!");
        setTimeout(() => router.push("/profile"), 1200);
      } else {
        removeAuthToken();
        setError("Only users with lsk admin role can sign in.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { email, setEmail, password, setPassword, error, message, handleSignIn };
}
