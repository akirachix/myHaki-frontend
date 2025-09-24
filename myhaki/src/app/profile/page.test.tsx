import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProfilePage from './page';
import * as profileUtils from '../utils/fetchProfile';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/profile',
}));

jest.mock('../utils/fetchProfile');

const mockUser = {
  first_name: 'Fiona',
  last_name: 'Wesonga',
  email: 'fiona@gmail.com',
  phone_number: '1234567890',
  image: 'http://fiona.com/image.jpg',
  role: 'user',
};

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => (key === 'userId' ? '1' : null)),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      configurable: true,
    });

    (profileUtils.fetchUserById as jest.Mock).mockResolvedValue(mockUser);
    (profileUtils.fetchUpdateUsers as jest.Mock).mockResolvedValue(mockUser);
  });

  it('renders loading initially', () => {
    (profileUtils.fetchUserById as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<ProfilePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders user data after loading', async () => {
    render(<ProfilePage />);
    expect(await screen.findByDisplayValue(mockUser.first_name)).toBeInTheDocument();
    expect(screen.getByAltText(/profile/i)).toHaveAttribute('src', mockUser.image);
  });

  it('enables editing and updates input value', async () => {
    render(<ProfilePage />);
    await screen.findByDisplayValue(mockUser.first_name);
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toBeEnabled();

    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    expect(firstNameInput).toHaveValue('Jane');
  });

  it('calls save and displays success message', async () => {
    render(<ProfilePage />);
    await screen.findByDisplayValue(mockUser.first_name);
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(profileUtils.fetchUpdateUsers).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument());
  });

  it('shows inline error message when save fails', async () => {
    (profileUtils.fetchUpdateUsers as jest.Mock).mockRejectedValue(new Error('Failed to update profile due to server error'));
    render(<ProfilePage />);
    await screen.findByDisplayValue(mockUser.first_name);
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(screen.getByText(/failed to update profile/i)).toBeInTheDocument());
  });
});
