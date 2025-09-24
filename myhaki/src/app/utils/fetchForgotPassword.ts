const baseUrl = "/api/forgot-password";

export async function forgotPasswordApi(email: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
