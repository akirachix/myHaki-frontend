import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchSignin from './useFetchSignIn';
import * as fetchSigninModule from '../utils/fetchSignin';
import * as authTokenModule from '../utils/authToken';

jest.mock('../utils/fetchSignin');
jest.mock('../utils/authToken');

describe('useFetchSignin', () => {
  const mockFetchSignin = fetchSigninModule.fetchSignin as jest.Mock;
  const mockSetAuthToken = authTokenModule.setAuthToken as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('initial loading and error states', () => {
    const { result } = renderHook(() => useFetchSignin());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets loading true immediately after signin called', async () => {
    mockFetchSignin.mockResolvedValue({ token: 'token123', id: 1 });
    const { result } = renderHook(() => useFetchSignin());

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.signin('email', 'password');
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
  });

  it('fetchSignin success sets token, userId and clears error/loading', async () => {
    const mockData = { token: 'token123', id: 5 };
    mockFetchSignin.mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchSignin());

    await act(async () => {
      const resp = await result.current.signin('user@example.com', 'password');
      expect(resp).toEqual(mockData);
    });

    expect(mockFetchSignin).toHaveBeenCalledWith('user@example.com', 'password');
    expect(mockSetAuthToken).toHaveBeenCalledWith(mockData.token);
    expect(localStorage.getItem('userId')).toBe('5');
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles signin failure and sets error/loading', async () => {
    const error = new Error('Invalid credentials');
    mockFetchSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useFetchSignin());

    await act(async () => {
      try {
        await result.current.signin('user@example.com', 'wrongpass');
      } catch {
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Invalid credentials');
      expect(result.current.loading).toBe(false);
    });

    expect(mockSetAuthToken).not.toHaveBeenCalled();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
