import { renderHook, act, waitFor } from "@testing-library/react";
import { useResetPassword } from "./useFetchResetPassword";
import { resetPasswordApi } from "../utils/fetchResetPassword";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("../utils/fetchResetPassword");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("useResetPassword Hook", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "test@example.com",
    });
    jest.clearAllMocks();
  });

  it("should handle successful password reset and navigate to signin", async () => {
    (resetPasswordApi as jest.Mock).mockResolvedValue({ detail: "Password reset successful." });

    const { result } = renderHook(() => useResetPassword());

    act(() => {
      result.current.setPassword("123456");
      result.current.setConfirmPassword("123456");
    });

    await act(async () => {
      await result.current.handleResetPassword();
    });

    expect(result.current.message).toBe("Password reset successful.");

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith("/authentication/sign-in")
    );
  });
});
