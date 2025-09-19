const baseUrl = process.env.BASE_URL;
export async function POST(request: Request) {
  try {
    const { email, password, confirm_password } = await request.json();
    if (!email || !password || !confirm_password) {
      return new Response("Email, password, and confirm password are required.", {
        status: 400,
      });
    }
    if (password !== confirm_password) {
      return new Response("Passwords do not match.", {
        status: 400,
      });
    }
    const response = await fetch(`${baseUrl}/resetpassword/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirm_password }),
    });
    const result = await response.json();
    return new Response(JSON.stringify(result), {
        status: 201,
        statusText: "password reset successfully",
    });
   }
    catch(error){
    return new Response((error as Error).message, {
        status: 500
    })
  }
}   
