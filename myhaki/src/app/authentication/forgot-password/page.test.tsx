import { render, screen } from "@testing-library/react";
import ForgotPasswordPage from "./page";
import { useForgotPassword } from "../../hooks/useFetchForgotPassword";

jest.mock("../../hooks/useFetchForgotPassword");

describe("ForgotPasswordPage", () => {
  it("shows loading state when loading=true", () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      email: "admin@example.com",
      setEmail: jest.fn(),
      error: "",
      message: "",
      loading: true,
      handleSendOtp: jest.fn(),
    });

    render(<ForgotPasswordPage />);

    expect(
      screen.getByText((content, element) =>
        element?.textContent === "Sending OTP to admin@example.com ..."
      )
    ).toBeInTheDocument();
  });

  it("shows error message if error exists", () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      email: "admin@example.com",
      setEmail: jest.fn(),
      error: "Something went wrong",
      message: "",
      loading: false,
      handleSendOtp: jest.fn(),
    });

    render(<ForgotPasswordPage />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows success message if message exists", () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      email: "admin@example.com",
      setEmail: jest.fn(),
      error: "",
      message: "OTP sent successfully",
      loading: false,
      handleSendOtp: jest.fn(),
    });

    render(<ForgotPasswordPage />);
    expect(screen.getByText(/OTP sent successfully/i)).toBeInTheDocument();
  });
});
