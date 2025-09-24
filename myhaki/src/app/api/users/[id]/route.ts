// const baseUrl = process.env.BASE_URL;

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const token = request.headers.get('authorization');
//     const headers: HeadersInit = {};
//     if (token) headers['Authorization'] = token;

//     const response = await fetch(`${baseUrl}/users/${id}/`, { headers });
//     const result = await response.json();
//     return new Response(JSON.stringify(result), { status: 200 });
//   } catch (error: any) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const body = await request.json();
//     const token = request.headers.get('authorization');
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//     };
//     if (token) headers['Authorization'] = token;

//     const response = await fetch(`${baseUrl}/users/${id}/`, {
//       method: 'PATCH',
//       headers,
//       body: JSON.stringify(body),
//     });

//     const result = await response.json();
//     return new Response(JSON.stringify(result), { status: response.status });
//   } catch (error: any) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


// src/app/api/users/[id]/route.ts
import { NextRequest } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  // ✅ Extract `id` from the URL path: /api/users/123 → "123"
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
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request: NextRequest) {
  // ✅ Extract `id` from the URL path
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
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}