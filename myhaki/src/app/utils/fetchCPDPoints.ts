// import { getAuthToken } from './authToken';
import { auth_token_key } from "@/app/utils/authToken";


const BASE_URL = 'api/cpd-points';

export async function fetchCPDPoints() {
  // const token = getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(auth_token_key ? { Authorization: `Token ${auth_token_key}` } : {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('fetchCPDPoints error: ' + error);
  }
}