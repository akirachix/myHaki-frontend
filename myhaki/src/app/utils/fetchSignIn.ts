const baseUrl = "/api/login";

export async function signInApi(email: string, password: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Failed to sign in");
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message || "Network error during sign in");
  }
}
