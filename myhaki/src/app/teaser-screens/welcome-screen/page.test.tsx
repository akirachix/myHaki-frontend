
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomePageThird from './page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('WelcomePageThird', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders descriptive text and dots', () => {
    render(<WelcomePageThird />);

    expect(
      screen.getByText(
        /Log in to begin managing justice with confidence and generate reports efficiently./i
      )
    ).toBeInTheDocument();


    const dots = screen.getAllByLabelText(/Step \d/);
    expect(dots.length).toBe(3);
  });

  it('navigates to correct route when clicking dots', () => {
    render(<WelcomePageThird />);
    const dots = screen.getAllByLabelText(/Step \d/);

    fireEvent.click(dots[0]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/teaser-screen');

    mockPush.mockClear();

    fireEvent.click(dots[1]);
    expect(mockPush).toHaveBeenCalledWith('/teaser-screens/teaser-SecondScreen');
  });

  it('navigates to signup on Next button click', () => {
    render(<WelcomePageThird />);
    const nextButton = screen.getByRole('button', { name: /get started/i });

    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith('signup');
  });
});
