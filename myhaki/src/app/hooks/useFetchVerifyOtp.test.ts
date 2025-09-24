import { renderHook, act } from "@testing-library/react";
import { useVerifyOtp } from "./useFetchVerifyOtp";
import * as verifyApi from "../utils/fetchVerifyOtp";
import * as forgotApi from "../utils/fetchForgotPassword";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: () => "test@example.com" }),
}));

jest.mock("../utils/fetchVerifyOtp", () => ({
  verifyOtpApi: jest.fn(),
}));
jest.mock("../utils/fetchForgotPassword", () => ({
  forgotPasswordApi: jest.fn(),
}));

describe("useVerifyOtp Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets error for invalid OTP", async () => {
    const { result } = renderHook(() => useVerifyOtp());

    act(() => {
      result.current.setOtp("12"); 
    });

    await act(async () => {
      await result.current.handleVerifyOtp();
    });

    expect(result.current.error).toBe("Please enter a valid 4-digit OTP.");
    expect(result.current.message).toBe("");
  });

  it("handles successful verification", async () => {
    (verifyApi.verifyOtpApi as jest.Mock).mockResolvedValue({
      detail: "OTP Verified!",
    });

    const { result } = renderHook(() => useVerifyOtp());

    act(() => {
      result.current.setOtp("1234"); 
    });

    await act(async () => {
      await result.current.handleVerifyOtp();
    });

    expect(result.current.error).toBe("");
    expect(result.current.message).toBe("OTP Verified!");
  });

  it("handles API error gracefully", async () => {
    (verifyApi.verifyOtpApi as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    const { result } = renderHook(() => useVerifyOtp());

    act(() => {
      result.current.setOtp("1234"); 
    });

    await act(async () => {
      await result.current.handleVerifyOtp();
    });

    expect(result.current.error).toBe("Server error");
    expect(result.current.message).toBe("");
  });

  it("resends OTP successfully", async () => {
    (forgotApi.forgotPasswordApi as jest.Mock).mockResolvedValue({
      detail: "OTP sent again",
    });

    const { result } = renderHook(() => useVerifyOtp());

    await act(async () => {
      await result.current.handleResendOtp();
    });

    expect(result.current.error).toBe("");
    expect(result.current.resendMessage).toBe("OTP sent again");
  });

  it("handles resend OTP failure", async () => {
    (forgotApi.forgotPasswordApi as jest.Mock).mockRejectedValue(
      new Error("Resend failed")
    );

    const { result } = renderHook(() => useVerifyOtp());

    await act(async () => {
      await result.current.handleResendOtp();
    });

    expect(result.current.error).toBe("Resend failed");
    expect(result.current.resendMessage).toBe("");
  });
});
