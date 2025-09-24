import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInPage from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock('@/app/hooks/useFetchSignIn', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: jest.fn(() => {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [error, setError] = React.useState('');
      const [message, setMessage] = React.useState('');
      const signin = jest.fn();
      return { email, setEmail, password, setPassword, error, message, signin };
    }),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
    pathname: '/sign-in',
  }),
  usePathname: () => '/sign-in',
  useSearchParams: () => new URLSearchParams(),
}));

import useFetchSignin from '@/app/hooks/useFetchSignIn';

describe("SignInPage", () => {
  it("renders form inputs and buttons", () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
  });

  it("toggles password visibility on button click", async () => {
    render(<SignInPage />);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "Hide password");
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "Show password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls setEmail and setPassword on input changes", async () => {
    render(<SignInPage />);
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, "user@test.com");
    expect(emailInput).toHaveValue("user@test.com");

    const passwordInput = screen.getByLabelText(/^password$/i);
    await userEvent.type(passwordInput, "mypassword");
    expect(passwordInput).toHaveValue("mypassword");
  });

  it("calls signin on form submission", async () => {
    const signinMock = jest.fn();
    (useFetchSignin as jest.Mock).mockReturnValue({
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      error: '',
      message: '',
      signin: signinMock,
    });

    const { container } = render(<SignInPage />);
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(signinMock).toHaveBeenCalled();
    });
  });

  it("shows error and message when provided", () => {
    (useFetchSignin as jest.Mock).mockReturnValue({
      email: '',
      setEmail: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      error: 'Invalid credentials',
      signin: jest.fn(),
    });

    render(<SignInPage />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();

    const container = screen.getByText('Invalid credentials').parentElement;
    expect(container).not.toBeNull();
  });
});
