import { fetchCases } from './fetchCases';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchCases returns data on success', async () => {
  const mockCases = [{ case_id: 1, status: 'pending' }];

  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce(mockCases),
  });

  const data = await fetchCases();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(data).toEqual(mockCases);
});

test('fetchCases returns empty array on 404', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 404,
    statusText: 'Not Found',
  });

  const data = await fetchCases();

  expect(data).toEqual([]);
});

test('fetchCases returns empty array on network error', async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));

  const data = await fetchCases();

  expect(data).toEqual([]);
});
