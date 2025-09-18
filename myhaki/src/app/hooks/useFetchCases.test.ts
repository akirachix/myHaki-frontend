import { renderHook, waitFor } from '@testing-library/react';
import useFetchCases from './useFetchCases';
import * as fetchModule from '../utils/fetchCases';

jest.mock('../utils/fetchCases');

describe('useFetchCases hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initial state is loading and empty cases', () => {
    (fetchModule.fetchCases as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useFetchCases());
    expect(result.current.loading).toBe(true);
    expect(result.current.cases).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads cases and updates loading state', async () => {
    const mockCases = [{ case_id: 1 }];

    (fetchModule.fetchCases as jest.Mock).mockResolvedValue(mockCases);

    const { result } = renderHook(() => useFetchCases());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cases).toEqual(mockCases);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    (fetchModule.fetchCases as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const { result } = renderHook(() => useFetchCases());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cases).toEqual([]);
    expect(result.current.error).toBe('Fetch failed');
  });
});
