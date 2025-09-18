export async function fetchLawyers() {
  try {
    const response = await fetch('/api/lawyers', {
      method: 'GET',
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch lawyers: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchLawyers error:', error);
    return [];  
  }
}
