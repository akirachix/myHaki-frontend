import { NextRequest, NextResponse } from 'next/server';

interface Case {
  created_at: string;
}
const baseUrl = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${baseUrl}/cases/`);
    const result = await response.json() as Case[];

    const sortedResult = result.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(sortedResult, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}