// const baseUrl = "/api/login";

// export async function signInApi(email: string, password: string) {
//   const res = await fetch(baseUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.detail || "Failed to sign in");
//   }

//   return await res.json();
// }


const baseUrl = "/api/login";

export async function signInApi(email: string, password: string, authToken: string) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Token ${authToken}`, // send token from frontend here
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to sign in");
  }

  return await res.json();
}
