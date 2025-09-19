import { auth_token_key } from "@/app/utils/authToken";

export async function GET() {
    const baseUrl = process.env.BASE_URL;
  
    const url = `${baseUrl}/users/?role=lsk_admin`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${auth_token_key}`, 
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response((error as Error).message, { status: 500 });
    }
  }