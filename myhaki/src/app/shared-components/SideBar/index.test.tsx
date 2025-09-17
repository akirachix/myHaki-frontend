import { render, screen } from "@testing-library/react";
import Sidebar from ".";
import * as nextNavigation from "next/navigation";


jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Sidebar", () => {
  it("highlights the dashboard link when pathname is /dashboard", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<Sidebar />);
    
    const dashboardLink = screen.getByText("Dashboard").closest("a");

    expect(dashboardLink).toHaveClass('bg-[#A87352]');
  });

  it("underlines the cases link when pathname is /cases", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/cases");

    render(<Sidebar />);

    const casesLink = screen.getByText("Cases").closest("a");
    expect(casesLink).toHaveClass("underline");
  });

  it("does not highlight or underline links if pathname does not match", () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue("/some-other-path");

    render(<Sidebar />);

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    const casesLink = screen.getByText("Cases").closest("a");

    expect(dashboardLink).not.toHaveClass("bg-[#AA8735]");
    expect(casesLink).not.toHaveClass("underline");
  });
});
