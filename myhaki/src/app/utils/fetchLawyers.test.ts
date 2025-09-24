import { fetchLawyers } from './fetchLawyers';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchLawyers returns data on success', async () => {
  const mockLawyers = [{ id: 1, first_name: 'Alice' }];

  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce(mockLawyers),
  });

  const data = await fetchLawyers();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(data).toEqual(mockLawyers);
});

test('fetchLawyers throws error on 500 error', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  });

  await expect(fetchLawyers()).rejects.toThrow('HTTP 500: Internal Server Error');
});

test('fetchLawyers throws error on network error', async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

  await expect(fetchLawyers()).rejects.toThrow(/fetchLawyers error: Error: Network error/);
});