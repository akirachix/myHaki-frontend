import { signInApi } from "./fetchSignIn";

describe("signInApi", () => {
  const baseUrl = "/api/login";

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("makes a POST request with correct headers and body", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "abc" }),
    });

    const email = "test@example.com";
    const password = "password123";

    await signInApi(email, password);

    expect(fetch).toHaveBeenCalledWith(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  });

  it("returns json data when response is ok", async () => {
    const mockData = { token: "abc123" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await signInApi("email@example.com", "pass123");
    expect(result).toEqual(mockData);
  });

  it("throws error with server error detail when response not ok", async () => {
    const mockError = { detail: "Invalid credentials" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });

    await expect(signInApi("email", "pass")).rejects.toThrow("Invalid credentials");
  });

  it("throws generic error if no detail in server error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(signInApi("email", "pass")).rejects.toThrow("Failed to sign in");
  });

  it("throws network error if fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));

    await expect(signInApi("email", "pass")).rejects.toThrow("Network failure");
  });
});
