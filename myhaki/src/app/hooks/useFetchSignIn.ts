// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInApi } from "../utils/fetchSignIn";
// export function useSignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleSignIn = async () => {
//     setError("");
//     setMessage("");
//     try {
//       const res = await signInApi(email, password);
//       if (res.role === "lsk_admin") {
//         setMessage("Sign in successful!");
//         localStorage.setItem("token", res.token);
//         setTimeout(() => router.push("/profile"), 1200);
//       } else {
//         setError("Only users with lsk admin role can sign in.");
//       }
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   return { email, setEmail, password, setPassword, error, message, handleSignIn };
// }

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInApi } from "../utils/fetchSignIn";

export function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Example: Instead of ENV, pass token here (could come from secure input or config)
  const authToken = "7b4b2cb877e5bbe2ad4dbe3b65cb5ae6bbc56788";

  const handleSignIn = async () => {
    setError("");
    setMessage("");
    try {
      const res = await signInApi(email, password, authToken);
      if (res.role === "lsk_admin") {
        setMessage("Sign in successful!");
        localStorage.setItem("token", res.token);
        setTimeout(() => router.push("/profile"), 1200);
      } else {
        setError("Only users with lsk admin role can sign in.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { email, setEmail, password, setPassword, error, message, handleSignIn };
}
