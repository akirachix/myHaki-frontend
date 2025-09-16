const baseUrl = '/api/cases';

export async function fetchCases() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch cases: ' + (error as Error).message);
  }
}