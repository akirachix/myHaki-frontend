const baseUrl = '/api/lsk-admin'; 

export async function fetchLSKAdmin() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch LSK admins: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in fetchLSKAdmin utility:', error);
    throw new Error(`Failed to fetch LSK admins: ${(error as Error).message}`);
  }
}