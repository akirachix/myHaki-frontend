import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInPage from "./page";

jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} />);

jest.mock('@/app/hooks/useFetchSignIn', () => ({
  useSignIn: jest.fn(),
}));

import { useSignIn } from '@/app/hooks/useFetchSignIn';

describe("SignInPage", () => {
  const mockHandleSignIn = jest.fn();
  const setEmail = jest.fn();
  const setPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSignIn as jest.Mock).mockReturnValue({
      email: "",
      setEmail,
      password: "",
      setPassword,
      error: "",
      message: "",
      handleSignIn: mockHandleSignIn,
    });
  });

  it("renders form inputs and buttons", () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
  });

  it("toggles password visibility on button click", () => {
    render(<SignInPage />);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "Hide password");
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "Show password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls setEmail and setPassword on input changes", () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@test.com" } });
    expect(setEmail).toHaveBeenCalledWith("user@test.com");

    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "mypassword" } });
    expect(setPassword).toHaveBeenCalledWith("mypassword");
  });

  it("calls handleSignIn on form submission", async () => {
    mockHandleSignIn.mockResolvedValueOnce(undefined);

    const { container } = render(<SignInPage />);
    const form = container.querySelector("form");
    if (!form) throw new Error("Form element not found");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockHandleSignIn).toHaveBeenCalled();
    });
  });

  it("shows error and message when provided", () => {
    (useSignIn as jest.Mock).mockReturnValue({
      email: "",
      setEmail: jest.fn(),
      password: "",
      setPassword: jest.fn(),
      error: "Invalid credentials",
      message: "Welcome back!",
      handleSignIn: mockHandleSignIn,
    });

    render(<SignInPage />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });
});
