import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from ".";
import * as nextNavigation from "next/navigation";
import * as authToken from "@/app/utils/authToken";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/app/utils/authToken", () => ({
  removeAuthToken: jest.fn(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("highlights the dashboard link when pathname is /dashboard", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass('bg-[#A87352]');
  });

  it("highlights the cases link when pathname is /cases", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/cases");
    render(<Sidebar />);
    const casesLink = screen.getByText("Cases").closest("a");
    expect(casesLink).toHaveClass('bg-[#A87352]');
  });

  it("does not highlight links if pathname does not match", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/some-other-path");
    render(<Sidebar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    const casesLink = screen.getByText("Cases").closest("a");
    expect(dashboardLink).not.toHaveClass("bg-[#A87352]");
    expect(casesLink).not.toHaveClass("bg-[#A87352]");
  });

  it('shows the signout modal when "Log out" is clicked', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    expect(screen.queryByRole("heading", { name: /sign out/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/Log out/i));
    expect(screen.getByRole("heading", { name: /sign out/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^sign out$/i })).toBeInTheDocument();
  });

  it('removes token and redirects on signout', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");
    const mockPush = jest.fn();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<Sidebar />);
    fireEvent.click(screen.getByText(/Log out/i));
    fireEvent.click(screen.getByRole("button", { name: /^sign out$/i }));
    expect(authToken.removeAuthToken).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/authentication/sign-in");
  });

  it('closes the modal when "Cancel" is clicked', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    fireEvent.click(screen.getByText(/Log out/i));
    expect(screen.getByRole("heading", { name: /sign out/i })).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByRole("heading", { name: /sign out/i })).not.toBeInTheDocument();
  });
});
