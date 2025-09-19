import { fetchLSKAdmin } from './fetchLSKAdmin';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchLSKAdmin returns data on success', async () => {
  const mockLSKAdmin = [{ id: 1, first_name: 'Alice' }];

  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce(mockLSKAdmin),
  });

  const data = await fetchLSKAdmin();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(data).toEqual(mockLSKAdmin);
});

test('fetchLSKAdmin throws error on 500 error', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  });

  await expect(fetchLSKAdmin()).rejects.toThrow('HTTP 500: Internal Server Error');
});

test('fetchLSKAdmin throws error on network error', async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

  await expect(fetchLSKAdmin()).rejects.toThrow(/fetchLSKAdmin error: Error: Network error/);
});