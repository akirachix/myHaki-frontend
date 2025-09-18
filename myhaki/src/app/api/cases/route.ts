export async function GET() {
    const baseUrl = process.env.BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/cases/`);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
}