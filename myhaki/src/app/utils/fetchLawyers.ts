export async function fetchLawyers() {
  try {
    const response = await fetch('/api/lawyers', {
      method: 'GET',
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    return response.json();


  } catch (error) {
    throw new Error('fetchLawyers error: ' + error);
  }
}
