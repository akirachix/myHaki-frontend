export async function GET() {
    const baseUrl = process.env.BASE_URL;
    const token = process.env.AUTH_TOKEN; 
  
    try {
      const url = `${baseUrl}/cpd-points/`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`, 
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch CPD points: ${response.statusText}`);
      }
  
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        status: 200,
      });
    } catch (error) {
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }