// src/app/cases/__tests__/CasesPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CasesPage from '../../page';
import Sidebar from '@/app/shared-components/SideBar';

vi.mock('@/app/shared-components/SideBar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('../components/Case-Status-Bar', () => ({
  __esModule: true,
  default: () => <div data-testid="case-status-bar">Case Status Bar</div>,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt ?? 'Mock Image'} />;
  },
}));

describe('CasesPage', () => {
  it('renders layout with sidebar and case status bar', () => {
    render(<CasesPage />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('case-status-bar')).toBeInTheDocument();
  });

  it('applies correct layout classes', () => {
    const { container } = render(<CasesPage />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-white', 'lg:flex');
  });
});