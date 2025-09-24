const baseUrl = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const token = request.headers.get('authorization');
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = token;

    const response = await fetch(`${baseUrl}/users/${id}/`, { headers });
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = token;

    const response = await fetch(`${baseUrl}/users/${id}/`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

