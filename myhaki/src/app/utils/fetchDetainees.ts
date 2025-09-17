const baseUrl = '/api/detainees';

export async function fetchDetainees() {
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
