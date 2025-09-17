// const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || "";

// export async function fetchProfile(userId: string) {
//   const res = await fetch(`/api/users/${userId}/`, {
//     method: "GET",
//     headers: {
//       Authorization: AUTH_TOKEN ? `Token ${AUTH_TOKEN}` : "",
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(errorText || "Failed to fetch profile");
//   }
//   return res.json();
// }

// export async function updateProfile(userId: string, formData: FormData) {
//   const res = await fetch(`/api/users/${userId}/`, {
//     method: "PUT",
//     headers: {
//       Authorization: AUTH_TOKEN ? `Token ${AUTH_TOKEN}` : "",
//     },
//     body: formData,
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(errorText || "Failed to update profile");
//   }
//   return res.json();
// }
