import { renderHook, waitFor } from '@testing-library/react';
import useFetchLawyers, { useFetchVerifiedLawyers } from './useFetchLawyers';
import * as fetchModule from '../utils/fetchLawyers';

jest.mock('../utils/fetchLawyers');


describe('useFetchLawyers hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initial state loading and empty lawyers', () => {
    (fetchModule.fetchLawyers as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetchLawyers());
    expect(result.current.loading).toBe(true);
    expect(result.current.lawyers).toEqual([]);
  });

  it('loads lawyers and stops loading', async () => {
    const mockLawyers = [{ id: 1, first_name: 'Alice' }];
    (fetchModule.fetchLawyers as jest.Mock).mockResolvedValue(mockLawyers);
    const { result } = renderHook(() => useFetchLawyers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.lawyers).toEqual(mockLawyers);
  });

  it('handles rejection gracefully', async () => {
    (fetchModule.fetchLawyers as jest.Mock).mockRejectedValue(new Error('Failed fetch'));
    const { result } = renderHook(() => useFetchLawyers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.lawyers).toEqual([]);
  });
});

describe('useFetchVerifiedLawyers hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initial state is loading and empty lawyers', () => {
    (fetchModule.fetchLawyers as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetchVerifiedLawyers());
    expect(result.current.loading).toBe(true);
    expect(result.current.lawyers).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads only verified lawyers', async () => {
    const mockLawyers = [
      { id: 1, verified: true },
      { id: 2, verified: false },
      { id: 3, verified: true }
    ];
    (fetchModule.fetchLawyers as jest.Mock).mockResolvedValue(mockLawyers);

    const { result } = renderHook(() => useFetchVerifiedLawyers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.lawyers).toEqual([
      { id: 1, verified: true },
      { id: 3, verified: true }
    ]);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetch fails', async () => {
    (fetchModule.fetchLawyers as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetchVerifiedLawyers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.lawyers).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });
});