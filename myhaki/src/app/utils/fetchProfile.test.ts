import { fetchUserById } from './fetchProfile';
import { getAuthToken } from './authToken';


jest.mock('./authToken');


describe('fetchUserById', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  it('fetches user data successfully', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '1', first_name: 'John' }),
      } as Response)
    );


    const data = await fetchUserById('1');
    expect(data).toEqual({ id: '1', first_name: 'John' });
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1', {
      headers: { Authorization: 'Token fake-token' },
      credentials: 'include',
    });
  });


  it('throws error when response not ok', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Not found' }),
      } as Response)
    );


    await expect(fetchUserById('1')).rejects.toThrow('Not found');
  });


  it('throws error on fetch failure', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));


    await expect(fetchUserById('1')).rejects.toThrow('Network error');
  });
});





