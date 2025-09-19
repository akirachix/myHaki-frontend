import React from "react";
import Image from "next/image";
import { render, fireEvent, screen } from "@testing-library/react";
import CaseDistribution from ".";


jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      return <Image {...props} />;
    },
  }));


const mockCases = [
  { predicted_case_type: "criminal", status: "accepted", stage: "completed" },
  { predicted_case_type: "criminal", status: "accepted", stage: "in_progress" },
  { predicted_case_type: "criminal", status: "accepted", stage: "trial" },
  { predicted_case_type: "criminal", status: "accepted", stage: "arraignment" },
  { predicted_case_type: "criminal", status: "accepted", stage: "bail" },
  { predicted_case_type: "criminal", status: "pending", stage: "in_progress" },
  { predicted_case_type: "civil", status: "accepted", stage: "completed" },
  { predicted_case_type: "civil", status: "accepted", stage: "trial" },
  { predicted_case_type: "environment", status: "accepted", stage: "completed" },
];

describe('CaseDistribution', () => {
  it('renders the chart title', () => {
    render(<CaseDistribution cases={mockCases} />);
    expect(screen.getByText(/Case Distribution/i)).toBeInTheDocument();
  });

  it('renders the chart container', () => {
    const { container } = render(<CaseDistribution cases={mockCases} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with no cases', () => {
    render(<CaseDistribution cases={[]} />);
    expect(screen.getByText('Case Distribution')).toBeInTheDocument();
  });
});