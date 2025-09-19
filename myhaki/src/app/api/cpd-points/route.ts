import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token){
      throw new Error("Authorization token is required");

    }
    
    const response = await fetch(`${baseUrl}/cpd-points`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },

    );
  }
}
