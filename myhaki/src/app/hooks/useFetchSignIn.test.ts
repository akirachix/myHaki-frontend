import { renderHook, act } from "@testing-library/react";
import { useSignIn } from "./useFetchSignIn";
import * as fetchSignInModule from "../utils/fetchSignIn";
import * as authTokenModule from "../utils/authToken";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../utils/fetchSignIn", () => ({
  signInApi: jest.fn(),
}));

jest.mock("../utils/authToken", () => ({
  setAuthToken: jest.fn(),
  removeAuthToken: jest.fn(),
}));

describe("useSignIn hook", () => {
  const mockPush = jest.fn();
  const mockSignInApi = fetchSignInModule.signInApi as jest.Mock;
  const mockSetAuthToken = authTokenModule.setAuthToken as jest.Mock;
  const mockRemoveAuthToken = authTokenModule.removeAuthToken as jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("initializes with empty email, password, error and message", () => {
    const { result } = renderHook(() => useSignIn());
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.error).toBe("");
    expect(result.current.message).toBe("");
  });

  it("sets error if password is shorter than 6 characters", async () => {
    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("123");
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    expect(result.current.error).toBe("Password must be at least 6 characters.");
    expect(mockSignInApi).not.toHaveBeenCalled();
  });

  it("sets auth token and message, then routes on successful admin sign in", async () => {
    mockSignInApi.mockResolvedValue({ token: "token123", role: "lsk_admin" });

    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail("admin@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockSetAuthToken).toHaveBeenCalledWith("token123");
    expect(result.current.message).toBe("Sign in successful!");
    expect(mockPush).toHaveBeenCalledWith("/profile");
    expect(result.current.error).toBe("");
  });

  it("removes auth token and sets error if role is not lsk_admin", async () => {
    mockSignInApi.mockResolvedValue({ token: "token123", role: "user" });

    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail("user@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    expect(mockSetAuthToken).toHaveBeenCalledWith("token123");
    expect(mockRemoveAuthToken).toHaveBeenCalled();
    expect(result.current.error).toBe("Only users with lsk admin role can sign in.");
    expect(result.current.message).toBe("");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("sets error when signInApi throws", async () => {
    mockSignInApi.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail("fail@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.message).toBe("");
    expect(mockSetAuthToken).not.toHaveBeenCalled();
  });

  it("sets error if no token in response", async () => {
    mockSignInApi.mockResolvedValue({ role: "lsk_admin" });

    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail("admin@example.com");
      result.current.setPassword("password");
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    expect(result.current.error).toBe("No token received from server");
    expect(mockSetAuthToken).not.toHaveBeenCalled();
  });
});
