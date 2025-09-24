import { fetchCPDPoints } from './fetchCPDPoints';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchCPDPoints returns data on success', async () => {
  const mockCPDRecords = [{ id: 1, points: 25 }];

  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce(mockCPDRecords),
  });

  const data = await fetchCPDPoints();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(data).toEqual(mockCPDRecords);
});

test('fetchCPDPoints throws error on 500 response', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  });

  await expect(fetchCPDPoints()).rejects.toThrow('HTTP 500: Internal Server Error');
});

test('fetchCPDPoints throws error on network error', async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

  await expect(fetchCPDPoints()).rejects.toThrow(/fetchCPDPoints error: Error: Network error/);
});