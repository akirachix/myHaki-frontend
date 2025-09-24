
import { getAuthToken } from './authToken';

const baseUrl = '/api/users';

export async function fetchUserById(id: string) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      headers: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch user data');
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function fetchUpdateUsers(
  id: string,
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password?: string;
  }
) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update user profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

