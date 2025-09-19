import { resetPasswordApi } from "./fetchResetPassword";

describe("resetPasswordApi", () => {
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

    const result = await resetPasswordApi(
      "test@example.com",
      "password123",
      "password123"
    );

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
        confirm_password: "password123",
      }),
    });
  });

  it("should throw error when response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid data" }),
      } as Response)
    );

    await expect(
      resetPasswordApi("test@example.com", "pass1", "pass2")
    ).rejects.toThrow("Failed to reset password");
  });

  it("should throw error when fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    await expect(
      resetPasswordApi("test@example.com", "password123", "password123")
    ).rejects.toThrow("Network Error");
  });
});
