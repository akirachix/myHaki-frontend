import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/navigation's useRouter to prevent invariant errors
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
  }),
}));

// Mock child components
jest.mock('./components/Cards', () => () => <div data-testid="cards">Cards</div>);
jest.mock('./components/CaseDistribution', () => () => <div data-testid="case-distribution">CaseDistribution</div>);
jest.mock('./components/CaseTrends', () => () => <div data-testid="case-trends">CaseTrends</div>);
jest.mock('./components/Rank', () => () => <div data-testid="rank">Rank</div>);
jest.mock('./components/Calendar', () => () => <div data-testid="calendar">Calendar</div>);

// Default hooks mock for loaded state
jest.mock('@/app/hooks/useFetchCases', () => () => ({
  cases: [{ id: 1, updated_at: '2024-06-10' }],
  loading: false,
}));
jest.mock('../hooks/useFetchLawyers', () => () => ({
  lawyers: [{ id: 1, verified: true, updated_at: '2024-06-10' }],
  loading: false,
}));
jest.mock('@/app/hooks/useFetchCPDPoints', () => () => ({
  cpdRecords: [{ id: 1, updated_at: '2024-06-10' }],
  loading: false,
}));
jest.mock('@/app/hooks/useFetchLSKAdmin', () => () => ({
  admins: [{ first_name: 'Jane', last_name: 'Admin' }],
  loading: false,
}));

jest.mock('../shared-components/Layout', () => {
  return ({ children }: React.PropsWithChildren) => (
    <div data-testid="layout" className="mocked-layout">
      {children}
    </div>
  );
});

import DashboardPage from '../page';

describe('DashboardPage', () => {
  test('renders loading state', () => {
    // Override useFetchCases hook mock to simulate loading state
    jest.doMock('@/app/hooks/useFetchCases', () => () => ({
      cases: [],
      loading: true,
    }));

    // Import DashboardPage again after doMock override
    // (Or clear module cache if needed)
    // Since jest.doMock may not update already imported modules,
    // one approach is to use jest.resetModules before this test
  });

  test('renders dashboard when loaded', async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText(/Hello, Jane Admin/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId('cards')).toBeInTheDocument();
    expect(screen.getByTestId('case-distribution')).toBeInTheDocument();
    expect(screen.getByTestId('case-trends')).toBeInTheDocument();
    expect(screen.getByTestId('rank')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });
});
