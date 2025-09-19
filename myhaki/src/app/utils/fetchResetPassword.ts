const baseUrl = "/api/reset-password";

export async function resetPasswordApi(
  email: string,
  password: string,
  confirm_password: string
) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirm_password }),
    });

    if (!response.ok) {
      throw new Error("Failed to reset password"); 
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
