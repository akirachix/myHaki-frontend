import { NextRequest } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').filter(Boolean).pop();

  if (!id) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = request.headers.get('authorization');
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = token;

    const response = await fetch(`${baseUrl}/users/${id}/`, { headers });
    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PATCH(request: NextRequest) {

  const id = request.nextUrl.pathname.split('/').filter(Boolean).pop();

  if (!id) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}