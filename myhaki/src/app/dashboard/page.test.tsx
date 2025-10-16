import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "./page";

jest.mock("../hooks/useFetchCases");
jest.mock("../hooks/useFetchLawyers");
jest.mock("../hooks/useFetchLSKAdmin");

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/dashboard"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

import useFetchCases from "../hooks/useFetchCases";
import { useFetchVerifiedLawyers } from "../hooks/useFetchLawyers";
import useFetchLSKAdmin from "../hooks/useFetchLSKAdmin";

describe("DashboardPage", () => {
  const mockCases = [
    { id: "1", updated_at: "2025-09-05T12:00:00Z" },
    { id: "2", updated_at: "2025-08-15T12:00:00Z" },
  ];
  const mockLawyers = [
    { id: "1", verified: true, updated_at: "2025-09-10T12:00:00Z" },
    { id: "2", verified: false, updated_at: "2025-09-10T12:00:00Z" },
    { id: "3", verified: true, updated_at: "2025-09-15T12:00:00Z" },
  ];
  const mockAdmins = [{ id: "1", first_name: "Admin", last_name: "User" }];

  beforeEach(() => {
    (useFetchCases as jest.Mock).mockReturnValue({
      cases: mockCases,
      loading: false,
    });
    (useFetchVerifiedLawyers as jest.Mock).mockReturnValue({
      lawyers: mockLawyers,
      loading: false,
    });
    (useFetchLSKAdmin as jest.Mock).mockReturnValue({
      admins: mockAdmins,
      loading: false,
    });

    window.localStorage.setItem("userId", "1");
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("renders loading state when any data is loading", () => {
    (useFetchCases as jest.Mock).mockReturnValue({ cases: [], loading: true });
    (useFetchVerifiedLawyers as jest.Mock).mockReturnValue({
      lawyers: [],
      loading: false,
    });
    (useFetchLSKAdmin as jest.Mock).mockReturnValue({ admins: [], loading: false });

    render(<DashboardPage />);
    expect(screen.getByText(/loading your dashboard/i)).toBeInTheDocument();
  });

  it("renders main dashboard content when data loaded", () => {
    render(<DashboardPage />);
    expect(screen.getByText(/hello, admin user/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open month\/year picker/i })).toBeInTheDocument();
    expect(screen.getByText(/cpd points rank/i)).toBeInTheDocument();
  });

  it("opens calendar popup when calendar button clicked", () => {
    render(<DashboardPage />);
    const calendarBtn = screen.getByRole("button", { name: /open month\/year picker/i });
    fireEvent.click(calendarBtn);
    expect(screen.getByText(/select period/i)).toBeInTheDocument();
  });
});
