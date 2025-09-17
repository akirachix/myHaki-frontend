
// import { useState, useEffect } from "react";
// import { fetchProfile, updateProfile } from "../utils/fetchUsers";

// export function useProfile(userId: string) {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updating, setUpdating] = useState(false);
//   const [updateError, setUpdateError] = useState("");
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   useEffect(() => {
//     if (!userId) {
//       setError("User ID is required");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError("");
//     fetchProfile(userId)
//       .then((data) => setProfile(data))
//       .catch((err) => setError(err.message || "Failed to fetch profile"))
//       .finally(() => setLoading(false));
//   }, [userId]);

//   const update = async (form: any) => {
//     if (!userId) return;

//     setUpdating(true);
//     setUpdateError("");
//     setUpdateSuccess(false);
//     try {
//       const formData = new FormData();
//       Object.keys(form).forEach((key) => {
//         if (form[key] !== undefined && form[key] !== null) {
//           formData.append(key, form[key]);
//         }
//       });
//       const data = await updateProfile(userId, formData);
//       setProfile(data);
//       setUpdateSuccess(true);
//     } catch (err: any) {
//       setUpdateError(err.message || "Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return {
//     profile,
//     loading,
//     error,
//     update,
//     updating,
//     updateError,
//     updateSuccess,
//   };
// }
