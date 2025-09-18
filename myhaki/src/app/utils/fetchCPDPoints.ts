const baseUrl = '/api/cpd-points/';
const token = process.env.AUTH_TOKEN; 

export async function fetchCPDPoints() {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch CPD points: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in fetchCPDPoints utility:', error);
    throw new Error(`Failed to fetch CPD points: ${(error as Error).message}`);
  }
}