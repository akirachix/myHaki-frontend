import { error } from "console";

const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${baseUrl}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(result), { status: response.status });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


