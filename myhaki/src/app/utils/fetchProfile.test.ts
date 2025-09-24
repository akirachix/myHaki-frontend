import { fetchUserById, fetchUpdateUsers } from './fetchProfile';
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

describe('fetchUpdateUsers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('updates user successfully', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    const userData = {
      first_name: 'Fiona',
      last_name: 'Wesonga',
      email: 'fiona@gmail.com',
      phone_number: '12345',
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: '1',
            ...userData,
          }),
      } as Response)
    );

    const data = await fetchUpdateUsers('1', userData);
    expect(data).toEqual({
      id: '1',
      ...userData,
    });
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token fake-token',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
  });

  it('throws error when update response not ok', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    const userData = {
      first_name: 'Fiona',
      last_name: 'Wesonga',
      email: 'fiona@gmail.com',
      phone_number: '12345',
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Update failed' }),
      } as Response)
    );

    await expect(fetchUpdateUsers('1', userData)).rejects.toThrow('Update failed');
  });

  it('throws error on fetch failure', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake-token');
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const userData = {
      first_name: 'Fiona',
      last_name: 'Wesonga',
      email: 'fiona@gmail.com',
      phone_number: '12345',
    };

    await expect(fetchUpdateUsers('1', userData)).rejects.toThrow('Network error');
  });
});
