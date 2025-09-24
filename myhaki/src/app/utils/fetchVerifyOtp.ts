const baseUrl = "/api/verify-otp";

export async function verifyOtpApi(email: string, otp: string) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify OTP");
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
