import { fetchSignin } from './fetchSignin';

describe('fetchSignin', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  it('should return result data when response is ok', async () => {
    const mockResponse = { token: 'abc123' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchSignin('test@example.com', 'password123');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    }));
  });

  it('should throw an error with detail message from response when response is not ok', async () => {
    const errorDetail = 'User not found';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ detail: errorDetail }),
    });

    await expect(fetchSignin('wrong@example.com', 'wrongpass')).rejects.toThrow(errorDetail);
  });

  it('should throw a generic error message if detail is not provided on failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    });

    await expect(fetchSignin('wrong@example.com', 'wrongpass')).rejects.toThrow('Invalid email or password');
  });

  it('should throw an error if fetch rejects (network error, etc.)', async () => {
    const fetchError = new Error('Network failure');
    (global.fetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(fetchSignin('test@example.com', 'password123')).rejects.toThrow('Network failure');
  });
});
