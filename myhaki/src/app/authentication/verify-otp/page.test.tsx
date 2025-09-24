import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VerifyOtpPage from "./verifyOtpClient";
import { useVerifyOtp } from "../../hooks/useFetchVerifyOtp";
import { useForgotPassword } from "../../hooks/useFetchForgotPassword";
import { useRouter } from "next/navigation";

jest.mock("../../hooks/useFetchVerifyOtp");
jest.mock("../../hooks/useFetchForgotPassword");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("VerifyOtpPage", () => {
  const setOtpMock = jest.fn();
  const handleVerifyOtpMock = jest.fn();
  const handleSendOtpMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (useVerifyOtp as jest.Mock).mockReturnValue({
      otp: "",
      setOtp: setOtpMock,
      error: "",
      message: "",
      loading: false,
      handleVerifyOtp: handleVerifyOtpMock,
      email: "test@example.com",
    });

    (useForgotPassword as jest.Mock).mockReturnValue({
      handleSendOtp: handleSendOtpMock,
      loading: false,
      message: "",
    });
  });

  it("renders heading and 4 OTP inputs", () => {
    render(<VerifyOtpPage />);
    expect(screen.getByText("Verify OTP")).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("updates OTP when typing in inputs", () => {
    render(<VerifyOtpPage />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(setOtpMock).toHaveBeenCalledWith(expect.any(String));
  });

  it("submits form and calls handleVerifyOtp", async () => {
    render(<VerifyOtpPage />);
    const button = screen.getByRole("button", { name: /verify/i });
    fireEvent.click(button);
    await waitFor(() => expect(handleVerifyOtpMock).toHaveBeenCalled());
  });

  it("shows error message when error is present", () => {
    (useVerifyOtp as jest.Mock).mockReturnValue({
      otp: "",
      setOtp: setOtpMock,
      error: "OTP has expired",
      message: "",
      loading: false,
      handleVerifyOtp: handleVerifyOtpMock,
      email: "test@example.com",
    });
    render(<VerifyOtpPage />);
    expect(screen.getByText("OTP has expired")).toBeInTheDocument();
  });

  it("shows success message when message is present", () => {
    (useVerifyOtp as jest.Mock).mockReturnValue({
      otp: "1234",
      setOtp: setOtpMock,
      error: "",
      message: "OTP verified successfully",
      loading: false,
      handleVerifyOtp: handleVerifyOtpMock,
      email: "test@example.com",
    });
    render(<VerifyOtpPage />);
    expect(screen.getByText("OTP verified successfully")).toBeInTheDocument();
  });

  it("disables inputs and button when loading is true", () => {
    (useVerifyOtp as jest.Mock).mockReturnValue({
      otp: "",
      setOtp: setOtpMock,
      error: "",
      message: "",
      loading: true,
      handleVerifyOtp: handleVerifyOtpMock,
      email: "test@example.com",
    });
    render(<VerifyOtpPage />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => expect(input).toBeDisabled());
    expect(screen.getByRole("button", { name: /verify/i })).toBeDisabled();
    expect(screen.getByText("Verifying OTP...")).toBeInTheDocument();
  });

  it("resends OTP when clicking Resend OTP", async () => {
    render(<VerifyOtpPage />);
    fireEvent.click(screen.getByText("Resend OTP"));
    await waitFor(() => expect(handleSendOtpMock).toHaveBeenCalled());
  });
});
