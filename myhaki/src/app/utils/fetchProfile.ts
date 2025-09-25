
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
  } catch (error: any) {
    throw new Error(error.message);
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
    imageFile?: File; 
  }
) {
  const token = getAuthToken();

  try {
    let body: BodyInit;
    const headers: HeadersInit = {
      ...(token ? { Authorization: `Token ${token}` } : {}),
    };

    if (data.imageFile) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      if (data.password) formData.append('password', data.password);
      formData.append('image', data.imageFile);

      body = formData;
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
      body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Profile updated successfully');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Update user error:', error.message);
    throw new Error(error.message);
  }
}
