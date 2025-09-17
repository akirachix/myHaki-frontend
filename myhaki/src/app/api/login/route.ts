// import { NextResponse } from "next/server";

// const baseUrl = process.env.BASE_URL;
// const authToken = process.env.AUTH_TOKEN;

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { detail: "Email and password are required." },
//         { status: 400 }
//       );
//     }

//     if (!baseUrl) {
//       return NextResponse.json(
//         { detail: "BASE_URL environment variable not set" },
//         { status: 500 }
//       );
//     }

//     if (!authToken) {
//       return NextResponse.json(
//         { detail: "AUTH_TOKEN environment variable not set" },
//         { status: 500 }
//       );
//     }

//     const backendUrl = `${baseUrl}/api/login/`;
//     console.log("POSTing to:", backendUrl);

//     const response = await fetch(backendUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${authToken}`, 
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const text = await response.text();
//     let result = {};
//     try {
//       result = text ? JSON.parse(text) : {};
//     } catch (e) {
//       result = { detail: "Invalid JSON from backend" };
//     }

//     return NextResponse.json(result, { status: response.status });
//   } catch (error) {
//     return NextResponse.json(
//       { detail: (error as Error).message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const authHeader = request.headers.get("Authorization");

    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password are required." }, { status: 400 });
    }

    if (!baseUrl) {
      return NextResponse.json({ detail: "BASE_URL environment variable not set" }, { status: 500 });
    }

    if (!authHeader) {
      return NextResponse.json({ detail: "Authorization header missing" }, { status: 401 });
    }

    const backendUrl = `${baseUrl}/api/login/`;
    console.log("POSTing to:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader, // forward token from frontend
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    let result = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = { detail: "Invalid JSON from backend" };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
