import { forgotPasswordApi } from "./fetchForgotPassword";

describe("forgotPasswordApi", () => {
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

    const result = await forgotPasswordApi("test@example.com");

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }),
    });
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid email" }),
      } as Response)
    );

    await expect(forgotPasswordApi("wrong@example.com")).rejects.toThrow(
      "Failed to send OTP"
    );
  });

  it("should throw error when fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    await expect(forgotPasswordApi("test@example.com")).rejects.toThrow(
      "Network Error"
    );
  });
});
