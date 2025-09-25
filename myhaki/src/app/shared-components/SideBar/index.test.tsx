import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from ".";
import { usePathname, useRouter } from "next/navigation";
import { removeAuthToken } from "@/app/utils/authToken";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/app/utils/authToken", () => ({
  removeAuthToken: jest.fn(),
}));

describe("Sidebar", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders logo and navigation links", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    expect(screen.getByAltText("MyHaki Logo")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Case")).toBeInTheDocument();
    expect(screen.getByText("Lawyers")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("highlights active link based on pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/cases");
    render(<Sidebar />);
    const caseLink = screen.getByText("Case").closest("a");

  });

  it("opens and closes the sign-out modal", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    fireEvent.click(screen.getByText("Log out"));
    expect(screen.getByText(/are you sure you want/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText(/are you sure you want/i)).not.toBeInTheDocument();
  });

  it("signs out and redirects when confirming logout", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    render(<Sidebar />);
    fireEvent.click(screen.getByText("Log out"));
    fireEvent.click(screen.getByText("Sign out"));
    expect(removeAuthToken).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/authentication/sign-in");
  });
});


