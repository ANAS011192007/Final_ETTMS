export async function POST(request: Request) {

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const device_id = searchParams.get("device_id"); // Retrieves the value of the 'skip' parameter

    console.log("ASASASA",searchParams);

    return new Response(JSON.stringify({message: device_id}), {status: 200});
}