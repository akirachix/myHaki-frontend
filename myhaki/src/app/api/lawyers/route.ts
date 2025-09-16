// import { NextRequest, NextResponse } from 'next/server';

// const baseUrl = process.env.BASE_URL;

// export async function GET(request: NextRequest) {
//   try {
//     const response = await fetch(`${baseUrl}/users/?role=lawyer`);
//     const result = await response.json();

//     return NextResponse.json(result, {
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
// src/app/api/lawyers/route.ts
// src/app/api/lawyers/route.ts

import { NextResponse } from "next/server";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://myhaki-3e53581dd62e.herokuapp.com/api").trim();
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// const REQUEST_TIMEOUT_MS = 30000; // 30 seconds

export async function GET() {
  console.log("🌐 [START] Fetching lawyers from:", `${BASE_URL}/users/?role=lawyer`);
  console.log("🔑 Token present:", !!AUTH_TOKEN);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log("⏰ [TIMEOUT TRIGGERED] after 30s");
    controller.abort();
  }, 30000);

  try {
    const res = await fetch(`${BASE_URL}/users/?role=lawyer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${AUTH_TOKEN}`,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("✅ [FETCH SUCCESS] Status:", res.status);

    const text = await res.text();
    console.log("📩 [RESPONSE BODY]:", text.substring(0, 200) + "...");

    if (!res.ok) {
      console.error(`[API Error] Status: ${res.status}, Body:`, text);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = JSON.parse(text);
    console.log("🎉 [SUCCESS] Parsed data:", data.length, "lawyers");
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);

    console.error("🚨 [FULL ERROR OBJECT]", {
      message: error instanceof Error ? error.message : String(error),
      cause: error instanceof Error ? error.cause : "No cause",
      stack: error instanceof Error ? error.stack : "No stack",
    });

    // ... rest of your error handling
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        errorMessage = "Request timed out after 30s. Backend may be waking up.";
        statusCode = 408;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}