import React from "react";
import { render, screen } from "@testing-library/react";
import Rank from ".";

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockLawyers = [
  { id: 1, first_name: 'Loice', last_name: 'Nekesa' },
  { id: 2, first_name: 'Ernest', last_name: 'John' },
  { id: 3, first_name: 'Shem', last_name: 'Wotwobi' },
];

const mockCpdPoints = [
  { cpd_id: 10, lawyer: 0, case: 1, description: '', points_earned: 1, total_points: 5 },
  { cpd_id: 11, lawyer: 1, case: 2, description: '', points_earned: 1, total_points: 7 },
  { cpd_id: 12, lawyer: 2, case: 3, description: '', points_earned: 1, total_points: 2 },
];

describe('Rank Component', () => {
  it('renders top three lawyers in correct order', () => {
    render(<Rank lawyers={mockLawyers} cpdPoints={mockCpdPoints} />);
    expect(screen.getByText('Loice Nekesa')).toBeInTheDocument();
    expect(screen.getByText('7 pts')).toBeInTheDocument();
    expect(screen.getByText('Ernest John')).toBeInTheDocument();
    expect(screen.getByText('5 pts')).toBeInTheDocument();
    expect(screen.getByText('Shem Wotwobi')).toBeInTheDocument();
    expect(screen.getByText('2 pts')).toBeInTheDocument();
  });

  it('shows N/A if not enough lawyers', () => {
    render(<Rank lawyers={[]} cpdPoints={[]} />);
    expect(screen.getAllByText('N/A')).toHaveLength(3);
    expect(screen.getAllByText(/0 pts/i)).toHaveLength(3);
  });

  it('shows loading message if props are missing', () => {
    render(<Rank lawyers={[]} cpdPoints={[]} />);
    expect(screen.getAllByText(/N\/A/i)).toHaveLength(3);
    expect(screen.getAllByText(/0 pts/i)).toHaveLength(3);
  });

  it('handles null lawyer ids in cpdPoints', () => {
    const mockCpdPointsWithNull = [
      { cpd_id: 13, lawyer: null, case: 4, description: '', points_earned: 1, total_points: 2 },
      ...mockCpdPoints,
    ];
    render(<Rank lawyers={mockLawyers} cpdPoints={mockCpdPointsWithNull} />);
    expect(screen.getByText('Loice Nekesa')).toBeInTheDocument();
    expect(screen.getByText('7 pts')).toBeInTheDocument();
    expect(screen.getByText('Ernest John')).toBeInTheDocument();
    expect(screen.getByText('5 pts')).toBeInTheDocument();
    expect(screen.getByText('Shem Wotwobi')).toBeInTheDocument();
    expect(screen.getByText('2 pts')).toBeInTheDocument();
  });
});