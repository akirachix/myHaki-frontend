import { getAuthToken } from './authToken';

const BASE_URL = '/api/lawyers';

export async function fetchLawyers() {
  const token = getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lawyers: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('fetchLawyers error:', error);
    return []; 
  }
}