import { renderHook, waitFor } from '@testing-library/react';
import useFetchCPDPoints from './useFetchCPDPoints';
import * as fetchModule from '../utils/fetchCPDPoints';

jest.mock('../utils/fetchCPDPoints');

describe('useFetchCPDPoints hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initial state is loading and empty cpdRecords', () => {
    (fetchModule.fetchCPDPoints as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useFetchCPDPoints());
    expect(result.current.loading).toBe(true);
    expect(result.current.cpdRecords).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads cpdRecords when fetchCPDPoints returns array', async () => {
    const mockRecords = [{ id: 1, points: 10 }, { id: 2, points: 20 }];
    (fetchModule.fetchCPDPoints as jest.Mock).mockResolvedValue(mockRecords);

    const { result } = renderHook(() => useFetchCPDPoints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cpdRecords).toEqual(mockRecords);
    expect(result.current.error).toBeNull();
  });

  it('loads cpdRecords when fetchCPDPoints returns paginated results', async () => {
    const mockRecords = [{ id: 3, points: 30 }];
    (fetchModule.fetchCPDPoints as jest.Mock).mockResolvedValue({ results: mockRecords });

    const { result } = renderHook(() => useFetchCPDPoints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cpdRecords).toEqual(mockRecords);
    expect(result.current.error).toBeNull();
  });

  it('sets error when fetchCPDPoints throws', async () => {
    (fetchModule.fetchCPDPoints as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetchCPDPoints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cpdRecords).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });
});