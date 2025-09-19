import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SuccessPage from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} />);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SuccessPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders success message, images, and button", () => {
    render(<SuccessPage />);

    expect(screen.getByRole("heading", { name: /congratulations!/i })).toBeInTheDocument();
    expect(screen.getByText(/your account has been successfully recovered./i)).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute("alt", "Lock");
    expect(images[1]).toHaveAttribute("alt", "Wave");

    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("navigates to sign-in page on button click", () => {
    render(<SuccessPage />);

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(mockPush).toHaveBeenCalledWith("/authentication/sign-in");
  });
});
