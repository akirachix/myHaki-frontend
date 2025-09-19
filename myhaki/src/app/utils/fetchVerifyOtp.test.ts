import { verifyOtpApi } from "./fetchVerifyOtp";

describe("verifyOtpApi", () => {
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return data when response is ok", async () => {
    const mockData = { success: true };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await verifyOtpApi("test@example.com", "123456");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", otp: "123456" }),
    });
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid OTP" }),
      } as Response)
    );

    await expect(verifyOtpApi("test@example.com", "000000")).rejects.toThrow(
      "Failed to verify OTP"
    );
  });

  it("should throw error when fetch itself fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    await expect(verifyOtpApi("test@example.com", "123456")).rejects.toThrow(
      "Network Error"
    );
  });
});
