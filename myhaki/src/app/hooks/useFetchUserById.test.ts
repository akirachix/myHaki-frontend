import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchUserById from './useFetchUserById';
jest.mock('../utils/authToken', () => ({
  getAuthToken: jest.fn(),
}));


import { getAuthToken } from '../utils/authToken';

describe('useFetchUserById', () => {
  const originalFetch = global.fetch;
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('sets error and loading false when no userId in localStorage', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('valid-token');

    const { result } = renderHook(() => useFetchUserById());

    await waitFor(() => {
      expect(result.current.error).toBe('User not logged in');
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it('sets error and loading false when no auth token', async () => {
    localStorage.setItem('userId', '123');
    (getAuthToken as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useFetchUserById());

    await waitFor(() => {
      expect(result.current.error).toBe('Authentication token not found');
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it('fetches and sets user successfully', async () => {
    const mockUser = { id: '123', name: 'Jabal Simiyu' };
    localStorage.setItem('userId', '123');
    (getAuthToken as jest.Mock).mockReturnValue('valid-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    });

    const { result } = renderHook(() => useFetchUserById());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/users/123', expect.objectContaining({
      headers: { Authorization: 'Bearer valid-token' },
      credentials: 'include',
    }));

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    localStorage.setItem('userId', '123');
    (getAuthToken as jest.Mock).mockReturnValue('valid-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useFetchUserById());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch user');
    expect(result.current.user).toBeNull();
  });
});
