const baseUrl = '/api/detainees';

export async function fetchDetainees() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    return response.json();


  } catch (error) {
    throw new Error('fetchDetainees error: ' + error);
  }
}
