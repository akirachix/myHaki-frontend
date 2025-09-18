export async function fetchLawyers() {
  const response = await fetch('/api/lawyers', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch lawyers: ${response.status}`);
  }

  return response.json();
}
