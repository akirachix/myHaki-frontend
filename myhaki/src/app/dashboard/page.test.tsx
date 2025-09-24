import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "./page";

jest.mock("../hooks/useFetchCases");
jest.mock("../hooks/useFetchLawyers");
jest.mock("../hooks/useFetchCPDPoints");
jest.mock("../hooks/useFetchLSKAdmin");

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/dashboard"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

import useFetchCases from "../hooks/useFetchCases";
import { useFetchVerifiedLawyers } from "../hooks/useFetchLawyers";
import useFetchCPDPoints from "../hooks/useFetchCPDPoints";
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
  const mockCPD = [
    { id: "1", updated_at: "2025-09-12T12:00:00Z" },
    { id: "2", updated_at: "2025-07-20T12:00:00Z" },
  ];
  const mockAdmins = [
    { id: "1", first_name: "Admin", last_name: "User" },
  ];

  beforeEach(() => {
    (useFetchCases as jest.Mock).mockReturnValue({
      cases: mockCases,
      loading: false,
    });
    (useFetchVerifiedLawyers as jest.Mock).mockReturnValue({
      lawyers: mockLawyers,
      loading: false,
    });
    (useFetchCPDPoints as jest.Mock).mockReturnValue({
      cpdRecords: mockCPD,
      loading: false,
    });
    (useFetchLSKAdmin as jest.Mock).mockReturnValue({
      admins: mockAdmins,
      loading: false,
    });
  });

  it("renders loading state when data is loading", () => {
    (useFetchCases as jest.Mock).mockReturnValue({ cases: [], loading: true });
    (useFetchVerifiedLawyers as jest.Mock).mockReturnValue({ lawyers: [], loading: false });
    (useFetchCPDPoints as jest.Mock).mockReturnValue({ cpdRecords: [], loading: false });
    (useFetchLSKAdmin as jest.Mock).mockReturnValue({ admins: [], loading: false });

    render(<DashboardPage />);
    expect(screen.getByText(/Loading your dashboard/i)).toBeInTheDocument();
  });

  it("filters data by selected month", () => {
    render(<DashboardPage />);
    const calendarBtn = screen.getByRole("button", { name: /open month\/year picker/i });
    fireEvent.click(calendarBtn);
  });
});
