// import { NextRequest, NextResponse } from "next/server";

// const baseUrl = process.env.BASE_URL;
// const authToken = process.env.AUTH_TOKEN;

// export async function GET(request: NextRequest) {
//   try {
//     if (!baseUrl) {
//       return NextResponse.json({ detail: "BASE_URL not set" }, { status: 500 });
//     }

//     const { pathname } = request.nextUrl;
//     const pathSegments = pathname.split("/");
//     const userId = pathSegments[pathSegments.length - 1];
//     if (!userId) {
//       return NextResponse.json({ detail: "User ID not provided" }, { status: 400 });
//     }

//     const token = request.headers.get("authorization") || `Token ${authToken || ""}`;
//     const url = `${baseUrl}/api/users/${userId}/`;
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json", ...(token ? { Authorization: token } : {}) },
//     });

//     if (!response.ok) {
//       const errText = await response.text();
//       return NextResponse.json({ detail: errText || "Error fetching user" }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ detail: (error as Error).message || "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     if (!baseUrl) {
//       return NextResponse.json({ detail: "BASE_URL not set" }, { status: 500 });
//     }

//     const { pathname } = request.nextUrl;
//     const pathSegments = pathname.split("/");
//     const userId = pathSegments[pathSegments.length - 1];
//     if (!userId) {
//       return NextResponse.json({ detail: "User ID not provided" }, { status: 400 });
//     }

//     const token = request.headers.get("authorization") || `Token ${authToken || ""}`;
//     const url = `${baseUrl}/api/users/${userId}/`;

//     const formData = await request.formData();

//     const response = await fetch(url, {
//       method: "PUT",
//       headers: { ...(token ? { Authorization: token } : {}) },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errText = await response.text();
//       return NextResponse.json({ detail: errText || "Failed to update profile" }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ detail: (error as Error).message || "Internal Server Error" }, { status: 500 });
//   }
// }
// src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;
const authToken = process.env.AUTH_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!baseUrl) {
      return NextResponse.json({ detail: "BASE_URL not set" }, { status: 500 });
    }

    const userId = params.id;
    if (!userId) {
      return NextResponse.json({ detail: "User ID not provided" }, { status: 400 });
    }

    const token = request.headers.get("authorization") || `Token ${authToken || ""}`;
    const url = `${baseUrl}/api/users/${userId}/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ detail: errText || "Error fetching user" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { detail: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!baseUrl) {
      return NextResponse.json({ detail: "BASE_URL not set" }, { status: 500 });
    }

    const userId = params.id; 
    if (!userId) {
      return NextResponse.json({ detail: "User ID not provided" }, { status: 400 });
    }

    const token = request.headers.get("authorization") || `Token ${authToken || ""}`;
    const url = `${baseUrl}/api/users/${userId}/`;

    const formData = await request.formData();

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ detail: errText || "Failed to update profile" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { detail: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}