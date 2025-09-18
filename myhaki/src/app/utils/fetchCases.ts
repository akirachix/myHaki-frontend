import { getAuthToken } from './authToken';

const BASE_URL = 'api/cases';

export async function fetchCases() {
  const token = getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('fetchCases error: ' + error);
  }
}