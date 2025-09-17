import { renderHook, waitFor } from '@testing-library/react';
import { useFetchLawyers } from './useFetchLawyers';
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
