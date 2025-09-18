
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized, token missing' }, { status: 401 });
  }

  const res = await fetch(`${process.env.BASE_URL}/users/?role=lawyer`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.detail || 'Failed to fetch' }, { status: res.status });
  }

  return NextResponse.json(data);
}
