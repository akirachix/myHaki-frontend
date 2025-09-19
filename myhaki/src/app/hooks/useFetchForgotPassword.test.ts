import { renderHook, act, waitFor } from "@testing-library/react";
import { useForgotPassword } from "./useFetchForgotPassword";
import { forgotPasswordApi } from "../utils/fetchForgotPassword";
import { useRouter } from "next/navigation";

jest.mock("../utils/fetchForgotPassword");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useForgotPassword Hook", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("should handle successful OTP send and navigate", async () => {
    (forgotPasswordApi as jest.Mock).mockResolvedValue({ detail: "OTP sent successfully" });

    const { result } = renderHook(() => useForgotPassword());

    act(() => {
      result.current.setEmail("test@example.com");
    });

    await act(async () => {
      await result.current.handleSendOtp();
    });

    expect(result.current.message).toBe("OTP sent successfully");
    expect(result.current.error).toBe("");

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith(
        "/authentication/verify-otp?email=test%40example.com"
      )
    );
  });
});
