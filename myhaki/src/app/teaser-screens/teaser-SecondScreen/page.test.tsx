
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomePageSecond from './page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('WelcomePageSecond', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders text and dots', () => {
    render(<WelcomePageSecond />);

    expect(
      screen.getByText(
        'Track different case types in real time by seeing the bigger picture, acting on the details.'
      )
    ).toBeInTheDocument();

  
    const dots = screen.getAllByLabelText(/Step \d/);
    expect(dots.length).toBe(3);
  });

  it('navigates to correct route when clicking dots', () => {
    render(<WelcomePageSecond />);
    const dots = screen.getAllByLabelText(/Step \d/);


    fireEvent.click(dots[0]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/teaser-screen');

    mockPush.mockClear();

    fireEvent.click(dots[2]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/welcome-screen');
  });

  it('navigates to welcome screen on Next button click', () => {
    render(<WelcomePageSecond />);
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/welcome-screen');
  });
    it('navigates to signup screen on Skip button click', () => {
      render(<WelcomePageSecond />);
      const skipButton = screen.getByRole('button', { name: /skip/i });
  
      fireEvent.click(skipButton);
      expect(mockPush).toHaveBeenCalledWith('/signup');
    });
});
