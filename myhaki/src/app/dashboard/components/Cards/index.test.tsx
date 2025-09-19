import React from "react";
import Image from "next/image";
import { render, fireEvent, screen } from "@testing-library/react";
import Cards from ".";


jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <Image {...props} />;
    },
  }));

  describe("Cards component", () => {
  const mockCases = [
    { status: "accepted", stage: "in_progress" },
    { status: "accepted", stage: "trial" },
    { status: "accepted", stage: "completed" },
    { status: "pending", stage: "arraignment" },
    { status: "accepted", stage: "arraignment" },
    { status: "accepted", stage: "bail" },
    { status: "accepted", stage: "completed" },
  ];

  const mockLawyers = [
    { id: 1, verified: true },
    { id: 2, verified: true },
    { id: 3, verified: false }, 
  ];

  it("renders all cards with correct labels", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText("Total Applications")).toBeInTheDocument();
    expect(screen.getByText("Active Lawyers")).toBeInTheDocument();
    expect(screen.getByText("Cases in progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows correct total applications count", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(mockCases.length.toString())).toBeInTheDocument();
  });

  it("shows correct active lawyers count", () => {
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(mockLawyers.length.toString())).toBeInTheDocument();
  });

  it("shows correct cases in progress count", () => {
    const inProgressCount = mockCases.filter(
      c => c.status === "accepted" && ["in_progress", "trial", "arraignment", "bail"].includes(c.stage)
    ).length;
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(inProgressCount.toString())).toBeInTheDocument();
  });

  it("shows correct completed cases count", () => {
    const completedCount = mockCases.filter(
      c => c.status === "accepted" && c.stage === "completed"
    ).length;
    render(<Cards cases={mockCases} lawyers={mockLawyers} />);
    expect(screen.getByText(completedCount.toString())).toBeInTheDocument();
  });

  it("renders with zero counts if arrays are empty", () => {
    render(<Cards cases={[]} lawyers={[]} />);
    const zeroElements = screen.getAllByText("0");
    expect(zeroElements.length).toBe(4);
    zeroElements.forEach(el => expect(el).toBeInTheDocument());
  });
});
