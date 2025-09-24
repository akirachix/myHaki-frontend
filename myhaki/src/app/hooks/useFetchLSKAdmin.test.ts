import { renderHook, waitFor } from '@testing-library/react';
import useFetchLSKAdmin from './useFetchLSKAdmin';
import * as fetchModule from '../utils/fetchLSKAdmin';

jest.mock('../utils/fetchLSKAdmin');

describe('useFetchLSKAdmin hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initial state is loading and empty admins', () => {
    (fetchModule.fetchLSKAdmin as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useFetchLSKAdmin());

    expect(result.current.loading).toBe(true);
    expect(result.current.admins).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads admins and updates loading state', async () => {
    const mockAdmins = [
      { id: 1, first_name: "Faith", last_name: "Adhiambo", email: "faith@example.com", role: "lsk_admin" },
      { id: 2, first_name: "Mahder", last_name: "Belete", email: "mahderbelete71@example.com", role: "lsk_admin" },
    ];

    (fetchModule.fetchLSKAdmin as jest.Mock).mockResolvedValue(mockAdmins);

    const { result } = renderHook(() => useFetchLSKAdmin());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.admins).toEqual(mockAdmins);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    (fetchModule.fetchLSKAdmin as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useFetchLSKAdmin());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.admins).toEqual([]);
    expect(result.current.error).toBe('Network Error');
  });
});