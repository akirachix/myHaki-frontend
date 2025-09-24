import { render, screen, fireEvent } from '@testing-library/react';
import WelcomePageFirst from './page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('WelcomePageFirst', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders welcome text and dots', () => {
    render(<WelcomePageFirst />);

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText(/Empowering you to manage legal aid cases/i)).toBeInTheDocument();

    const dots = screen.getAllByRole('button', { hidden: true }); 
    expect(dots.length).toBe(2);
  });

  it('navigates to correct route when clicking dots', () => {
    render(<WelcomePageFirst />);
    const dots = screen.getAllByLabelText(/Step \d/);

    fireEvent.click(dots[1]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/teaser-SecondScreen');

    mockPush.mockClear();

    fireEvent.click(dots[2]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/welcome-screen');
  });

  it('navigates to teaser second screen on Next button click', () => {
    render(<WelcomePageFirst />);
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/teaser-SecondScreen');
  });

  it('navigates to signup screen on Skip button click', () => {
    render(<WelcomePageFirst />);
    const skipButton = screen.getByRole('button', { name: /skip/i });

    fireEvent.click(skipButton);
    expect(mockPush).toHaveBeenCalledWith('/authentication/sign-in');
  });

});
