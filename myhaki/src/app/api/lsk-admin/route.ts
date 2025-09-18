export async function GET() {
    const baseUrl = process.env.BASE_URL;
    const token = process.env.AUTH_TOKEN; 
  
    const url = `${baseUrl}/users/?role=lsk_admin`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`, 
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response((error as Error).message, { status: 500 });
    }
  }