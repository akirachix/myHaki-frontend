import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordPage from "./resetPassword"; 
import { useResetPassword } from "../../hooks/useFetchResetPassword";

jest.mock("../../hooks/useFetchResetPassword");

describe("ResetPasswordPage", () => {
  const setPasswordMock = jest.fn();
  const setConfirmPasswordMock = jest.fn();
  const handleResetPasswordMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useResetPassword as jest.Mock).mockReturnValue({
      password: "",
      setPassword: setPasswordMock,
      confirmPassword: "",
      setConfirmPassword: setConfirmPasswordMock,
      error: "",
      message: "",
      handleResetPassword: handleResetPasswordMock,
    });
  });

  it("renders heading and both password fields", () => {
    render(<ResetPasswordPage />);
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("calls setPassword when typing in New Password", () => {
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "MySecret123" },
    });
    expect(setPasswordMock).toHaveBeenCalledWith("MySecret123");
  });

  it("calls setConfirmPassword when typing in Confirm Password", () => {
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "MySecret123" },
    });
    expect(setConfirmPasswordMock).toHaveBeenCalledWith("MySecret123");
  });

  it("shows error message when error exists", () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      password: "",
      setPassword: setPasswordMock,
      confirmPassword: "",
      setConfirmPassword: setConfirmPasswordMock,
      error: "Passwords do not match",
      message: "",
      handleResetPassword: handleResetPasswordMock,
    });

    render(<ResetPasswordPage />);
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("shows success message when message exists", () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      password: "",
      setPassword: setPasswordMock,
      confirmPassword: "",
      setConfirmPassword: setConfirmPasswordMock,
      error: "",
      message: "Password reset successfully!",
      handleResetPassword: handleResetPasswordMock,
    });

    render(<ResetPasswordPage />);
    expect(
      screen.getByText("Password reset successfully!")
    ).toBeInTheDocument();
  });

  it("calls handleResetPassword when form is submitted", async () => {
    render(<ResetPasswordPage />);
    fireEvent.submit(screen.getByRole("button", { name: /change password/i }));
    await waitFor(() => expect(handleResetPasswordMock).toHaveBeenCalled());
  });

  it("toggles password visibility when clicking eye button", () => {
    render(<ResetPasswordPage />);
    const passwordInput = screen.getByLabelText("New Password") as HTMLInputElement;
    const toggleButton = screen.getAllByRole("button", { hidden: true })[0]; 

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });
});
