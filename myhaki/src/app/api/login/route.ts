import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password are required." }, { status: 400 });
    }

    if (!baseUrl) {
      return NextResponse.json({ detail: "BASE_URL environment variable not set" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
